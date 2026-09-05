import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import https from 'https';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'https://www.google.com/maps/place/Espaco+Lumier/@-15.802027,-48.0427106,3a,84.6y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIC-ipHv8QE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWnbAuRWwt2gkgXxk95gq24PQf3RN-nJxcW6MwKNiTPocFJ-gyAwOHdiVuHP39KZIVh7JuYzx_xyjBPU-xk5LRZoFaDLj8Rwk9fOUa6FQYBC3SgKrvQzQJq85MRshCtdtc_gd6wVfQ%3Dw203-h135-k-no!7i960!8i640!4m18!1m8!3m7!1s0x935a32f61fec68cd:0xdb473c431db6d1cb!2sEspaco+Lumier!8m2!3d-15.8020342!4d-48.042887!10e5!16s%2Fg%2F11b6j772rg!3m8!1s0x935a32f61fec68cd:0xdb473c431db6d1cb!8m2!3d-15.8020342!4d-48.042887!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11b6j772rg?entry=ttu';

const OUTPUT_DIR = path.resolve('google-fotos');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('Iniciando navegador Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1920,1080',
      '--lang=pt-BR'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    console.log('Acessando URL do Google Maps...');
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

    // Try accepting cookies/consent if present
    try {
      const consentButtons = await page.$$('button');
      for (const btn of consentButtons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && (text.includes('Aceitar') || text.includes('Concordo') || text.includes('Accept'))) {
          console.log('Clicando em botão de consentimento:', text.trim());
          await btn.click();
          await new Promise(r => setTimeout(r, 2000));
          break;
        }
      }
    } catch (e) {
      // ignore
    }

    await new Promise(r => setTimeout(r, 3000));

    // Check if we are already in photo view or need to click 'Fotos'
    console.log('Verificando visualização de fotos...');
    try {
      const photoButtons = await page.$$('button, div[role="tab"]');
      for (const btn of photoButtons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && (text.trim() === 'Fotos' || text.includes('Todas as fotos') || text.trim() === 'Todas')) {
          console.log('Clicando na aba de fotos:', text.trim());
          await btn.click();
          await new Promise(r => setTimeout(r, 3000));
          break;
        }
      }
    } catch (e) {
      console.log('Erro ao procurar aba Fotos:', e.message);
    }

    // Scroll down to load all photos
    console.log('Rolando galeria para carregar todas as fotos...');
    let lastCount = 0;
    let stableIterations = 0;
    const maxScrolls = 60;

    for (let i = 0; i < maxScrolls; i++) {
      // Find scrollable container with photos
      await page.evaluate(() => {
        // Try finding scroll containers
        const containers = Array.from(document.querySelectorAll('div[role="feed"], div[role="region"], div.m6QErb, div[tabindex="-1"]'));
        let scrolled = false;
        for (const c of containers) {
          if (c.scrollHeight > c.clientHeight + 100) {
            c.scrollTop += 1500;
            scrolled = true;
          }
        }
        if (!scrolled) {
          window.scrollBy(0, 1500);
        }
      });

      await new Promise(r => setTimeout(r, 1200));

      // Check current photo count
      const currentCount = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img, div[style*="background-image"]'));
        const urls = new Set();
        for (const el of imgs) {
          if (el.tagName === 'IMG' && el.src && el.src.includes('googleusercontent.com')) {
            urls.add(el.src);
          }
          const bg = el.style ? el.style.backgroundImage : '';
          if (bg && bg.includes('googleusercontent.com')) {
            const m = bg.match(/url\(["']?([^"']+)["']?\)/);
            if (m) urls.add(m[1]);
          }
        }
        return urls.size;
      });

      console.log(`Scroll ${i + 1}/${maxScrolls} - Fotos encontradas até agora: ${currentCount}`);

      if (currentCount === lastCount && currentCount > 0) {
        stableIterations++;
        if (stableIterations >= 5) {
          console.log('Nenhuma nova foto carregada após 5 scrolls consecutivos. Finalizando rolagem.');
          break;
        }
      } else {
        stableIterations = 0;
      }
      lastCount = currentCount;
    }

    // Extract all unique high-res URLs
    console.log('Extraindo links finais em alta resolução...');
    const photoUrls = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const rawUrls = new Set();

      for (const el of elements) {
        if (el.tagName === 'IMG' && el.src && el.src.includes('googleusercontent.com')) {
          rawUrls.add(el.src);
        }
        if (el.style && el.style.backgroundImage && el.style.backgroundImage.includes('googleusercontent.com')) {
          const match = el.style.backgroundImage.match(/url\(["']?([^"']+)["']?\)/);
          if (match) rawUrls.add(match[1]);
        }
      }

      // Filter out user avatars, icons, etc.
      const valid = [];
      for (let u of rawUrls) {
        if (u.includes('default-user') || u.includes('/a/') || u.includes('photo.jpg')) {
          continue;
        }
        // Normalize to high resolution
        // e.g. =w203-h135-k-no -> =s2048
        let highRes = u;
        if (u.includes('=')) {
          highRes = u.split('=')[0] + '=s2048';
        }
        valid.push(highRes);
      }

      return Array.from(new Set(valid));
    });

    console.log(`Total de fotos únicas encontradas: ${photoUrls.length}`);
    fs.writeFileSync('scratch/photos_urls.json', JSON.stringify(photoUrls, null, 2), 'utf-8');

    // Download photos
    console.log(`Baixando fotos para ${OUTPUT_DIR}...`);
    let downloaded = 0;
    for (let idx = 0; idx < photoUrls.length; idx++) {
      const photoUrl = photoUrls[idx];
      const filename = `foto_${String(idx + 1).padStart(3, '0')}.jpg`;
      const filepath = path.join(OUTPUT_DIR, filename);

      try {
        await new Promise((resolve, reject) => {
          const file = fs.createWriteStream(filepath);
          https.get(photoUrl, res => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
              https.get(res.headers.location, res2 => {
                res2.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
              }).on('error', reject);
            } else {
              res.pipe(file);
              file.on('finish', () => { file.close(); resolve(); });
            }
          }).on('error', err => {
            fs.unlink(filepath, () => {});
            reject(err);
          });
        });
        downloaded++;
        if ((idx + 1) % 5 === 0 || idx === photoUrls.length - 1) {
          console.log(`Progresso: ${idx + 1}/${photoUrls.length} fotos baixadas.`);
        }
      } catch (err) {
        console.error(`Erro ao baixar ${photoUrl}:`, err.message);
      }
    }

    console.log(`Concluído! ${downloaded} fotos baixadas com sucesso em "${OUTPUT_DIR}".`);

  } catch (err) {
    console.error('Erro na execução:', err);
  } finally {
    await browser.close();
  }
}

run();
