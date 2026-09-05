import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import https from 'https';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'https://www.google.com/maps/search/Espaco+Lumier/@-15.8020342,-48.042887,17z';
const OUTPUT_DIR = path.resolve('google-fotos');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    // If URL starts with //, prepend https:
    let fullUrl = url;
    if (fullUrl.startsWith('//')) {
      fullUrl = 'https:' + fullUrl;
    }

    const file = fs.createWriteStream(destPath);
    const getReq = (targetUrl) => {
      https.get(targetUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          getReq(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          fs.unlink(destPath, () => {});
          reject(new Error(`Status code ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    };
    getReq(fullUrl);
  });
}

async function run() {
  console.log('--- INICIANDO EXTRAÇÃO DE FOTOS DO ESPAÇO LUMIER ---');
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

    console.log('1. Acessando página do local no Google Maps...');
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 4000));

    console.log('2. Abrindo galeria de fotos...');
    const opened = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      for (const b of buttons) {
        const text = b.innerText || '';
        const aria = b.getAttribute('aria-label') || '';
        if (text.includes('Ver fotos') || aria.toLowerCase().includes('foto de espaco lumier') || aria.toLowerCase().includes('ver fotos')) {
          b.click();
          return true;
        }
      }
      return false;
    });

    if (!opened) {
      console.log('Tentando clique alternativo no cabeçalho...');
      await page.evaluate(() => {
        const hero = document.querySelector('button.aoRNLd, div.RZ66Rb button');
        if (hero) hero.click();
      });
    }

    await new Promise(r => setTimeout(r, 4000));

    console.log('3. Rolando galeria para coletar todas as fotos...');
    const collectedUrls = new Set();
    let stableCount = 0;
    let lastSize = 0;
    const maxScrolls = 70;

    for (let i = 0; i < maxScrolls; i++) {
      // Collect current visible photos in DOM
      const currentUrls = await page.evaluate(() => {
        const urls = [];
        const imgs = Array.from(document.querySelectorAll('img, div[style*="background-image"], a[style*="background-image"]'));
        for (const el of imgs) {
          if (el.tagName === 'IMG' && el.src && el.src.includes('googleusercontent.com')) {
            urls.push(el.src);
          }
          const style = el.getAttribute('style') || '';
          if (style.includes('background-image') && style.includes('googleusercontent.com')) {
            const m = style.match(/url\(["']?([^"'\)]+)["']?\)/);
            if (m) urls.push(m[1]);
          }
        }
        return urls;
      });

      for (const u of currentUrls) {
        // Filter out profile avatars, small icons, etc.
        if (!u.includes('default-user') && !u.includes('/a-/') && !u.includes('/a/')) {
          // Base URL without size parameters
          let cleanUrl = u;
          if (cleanUrl.startsWith('//')) cleanUrl = 'https:' + cleanUrl;
          
          // Get the base image url
          const eqIdx = cleanUrl.indexOf('=');
          if (eqIdx !== -1) {
            cleanUrl = cleanUrl.substring(0, eqIdx) + '=s2048';
          }
          collectedUrls.add(cleanUrl);
        }
      }

      console.log(`Scroll ${i + 1}/${maxScrolls} - Fotos únicas acumuladas: ${collectedUrls.size}`);

      // Scroll containers
      const scrollInfo = await page.evaluate(() => {
        const containers = Array.from(document.querySelectorAll('div.m6QErb, div.DxyBCb, div.UL7Qtf, div[role="region"]'));
        let scrolled = false;
        let reachedEnd = false;
        for (const c of containers) {
          if (c.scrollHeight > c.clientHeight + 100) {
            c.scrollTop += 1200;
            scrolled = true;
            if (c.scrollTop + c.clientHeight >= c.scrollHeight - 100) {
              reachedEnd = true;
            }
          }
        }
        if (!scrolled) window.scrollBy(0, 1200);
        return { scrolled, reachedEnd };
      });

      await new Promise(r => setTimeout(r, 1200));

      if (collectedUrls.size === lastSize) {
        stableCount++;
        if (stableCount >= 6) {
          console.log('Nenhuma nova foto encontrada após 6 scrolls. Galeria totalmente percorrida!');
          break;
        }
      } else {
        stableCount = 0;
      }
      lastSize = collectedUrls.size;
    }

    const finalUrls = Array.from(collectedUrls);
    console.log(`\n4. Total de fotos identificadas para download: ${finalUrls.length}`);
    fs.writeFileSync('scratch/final_photo_urls.json', JSON.stringify(finalUrls, null, 2), 'utf-8');

    // Download each photo into google-fotos/
    console.log(`\n5. Iniciando download para a pasta: ${OUTPUT_DIR}\n`);
    let downloadedCount = 0;
    for (let idx = 0; idx < finalUrls.length; idx++) {
      const photoUrl = finalUrls[idx];
      const filename = `foto_${String(idx + 1).padStart(3, '0')}.jpg`;
      const filePath = path.join(OUTPUT_DIR, filename);

      try {
        await downloadImage(photoUrl, filePath);
        downloadedCount++;
        if ((idx + 1) % 10 === 0 || idx === finalUrls.length - 1) {
          console.log(`[DOWNLOAD] ${idx + 1}/${finalUrls.length} fotos salvas...`);
        }
      } catch (err) {
        // Fallback: try original thumbnail url or lower resolution if =s2048 fails
        try {
          const fallbackUrl = photoUrl.replace('=s2048', '=w1600-h1200');
          await downloadImage(fallbackUrl, filePath);
          downloadedCount++;
        } catch (err2) {
          console.error(`Falha ao baixar foto ${idx + 1}: ${err2.message}`);
        }
      }
    }

    console.log(`\n=== SUCESSO! ===`);
    console.log(`Total de ${downloadedCount} fotos baixadas com sucesso em "${OUTPUT_DIR}"!`);

  } catch (err) {
    console.error('Erro durante o processo:', err);
  } finally {
    await browser.close();
  }
}

run();
