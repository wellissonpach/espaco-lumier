import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'https://www.google.com/maps/search/Espaco+Lumier/@-15.8020342,-48.042887,17z';

async function checkScroll() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080', '--lang=pt-BR']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 4000));

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    for (const b of buttons) {
      if (b.innerText.includes('Ver fotos') || (b.getAttribute('aria-label') && b.getAttribute('aria-label').toLowerCase().includes('foto'))) {
        b.click();
        break;
      }
    }
  });

  await new Promise(r => setTimeout(r, 3000));

  // Inspect all scrollable containers
  const containers = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const scrollable = [];
    for (const el of all) {
      if (el.scrollHeight > el.clientHeight && el.clientHeight > 200) {
        scrollable.push({
          tag: el.tagName,
          className: el.className,
          role: el.getAttribute('role'),
          tabIndex: el.tabIndex,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
          imgCount: el.querySelectorAll('img, div[style*="background-image"]').length
        });
      }
    }
    return scrollable;
  });

  console.log('Scrollable containers:', containers);
  await browser.close();
}

checkScroll();
