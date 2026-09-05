import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'https://www.google.com/maps/search/Espaco+Lumier/@-15.8020342,-48.042887,17z';

async function testExactClick() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080', '--lang=pt-BR']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  console.log('Navigating...');
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 4000));

  // Find elements with exact text
  const buttonInfo = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const matches = [];
    for (const el of all) {
      if (el.children.length === 0 && (el.innerText === 'Ver fotos' || (el.getAttribute('aria-label') && el.getAttribute('aria-label').includes('foto')))) {
        matches.push({
          tag: el.tagName,
          text: el.innerText,
          parentTag: el.parentElement ? el.parentElement.tagName : null,
          ariaLabel: el.getAttribute('aria-label')
        });
      }
    }
    return matches;
  });

  console.log('Matches:', buttonInfo);

  // Click the cover photo button: in Google Maps it's typically button[aria-label*="Espaco Lumier"] or button with "Ver fotos"
  const clickResult = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    for (const b of buttons) {
      if (b.innerText.includes('Ver fotos') || (b.getAttribute('aria-label') && b.getAttribute('aria-label').toLowerCase().includes('foto'))) {
        b.click();
        return 'Clicked button: ' + b.innerText + ' / ' + b.getAttribute('aria-label');
      }
    }
    // Also try clicking image container
    const heroBtn = document.querySelector('button.aoRNLd, button[jsaction*="heroHeader"]');
    if (heroBtn) {
      heroBtn.click();
      return 'Clicked heroBtn';
    }
    return 'None clicked';
  });

  console.log('Click result:', clickResult);
  await new Promise(r => setTimeout(r, 4000));

  await page.screenshot({ path: 'scratch/photos_gallery.png' });

  // Count photos
  const urls = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img, div[style*="background-image"]'));
    const set = new Set();
    for (const el of imgs) {
      if (el.tagName === 'IMG' && el.src && el.src.includes('googleusercontent.com')) {
        set.add(el.src);
      }
      if (el.style && el.style.backgroundImage && el.style.backgroundImage.includes('googleusercontent.com')) {
        const m = el.style.backgroundImage.match(/url\(["']?([^"']+)["']?\)/);
        if (m) set.add(m[1]);
      }
    }
    return Array.from(set);
  });

  console.log('Photos after clicking photo button:', urls.length);
  for (const u of urls.slice(0, 5)) {
    console.log(' ->', u);
  }

  await browser.close();
}

testExactClick();
