import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'https://www.google.com/maps/search/Espaco+Lumier/@-15.8020342,-48.042887,17z';

async function testClickPhotos() {
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
  await new Promise(r => setTimeout(r, 3000));

  console.log('Finding and clicking "Ver fotos"...');
  const clicked = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('button, div, a, span'));
    for (const el of elements) {
      if (el.textContent && (el.textContent.includes('Ver fotos') || el.textContent.includes('Mais de 118 fotos'))) {
        const clickable = el.closest('button') || el.closest('a') || el;
        clickable.click();
        return el.textContent.trim();
      }
    }
    return null;
  });

  console.log('Clicked element:', clicked);
  await new Promise(r => setTimeout(r, 4000));

  // Count photos currently in DOM
  const stats = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img, div[style*="background-image"]'));
    const urls = [];
    for (const el of imgs) {
      if (el.tagName === 'IMG' && el.src && el.src.includes('googleusercontent.com')) {
        urls.push(el.src);
      }
      if (el.style && el.style.backgroundImage && el.style.backgroundImage.includes('googleusercontent.com')) {
        urls.push(el.style.backgroundImage);
      }
    }
    return {
      title: document.title,
      totalImgElements: imgs.length,
      googleUserContentCount: urls.length,
      sampleUrls: urls.slice(0, 5)
    };
  });

  console.log('Stats after click:', stats);
  await page.screenshot({ path: 'scratch/after_photos_click.png' });

  await browser.close();
}

testClickPhotos();
