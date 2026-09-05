import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PLACE_URL = 'https://www.google.com/maps/place/Espaco+Lumier/@-15.8020342,-48.042887,17z/data=!4m7!3m6!1s0x935a32f61fec68cd:0xdb473c431db6d1cb!8m2!3d-15.8020342!4d-48.042887!16s%2Fg%2F11b6j772rg';

async function testPlace() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080', '--lang=pt-BR']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  console.log('Navigating to place URL...');
  await page.goto(PLACE_URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 4000));

  await page.screenshot({ path: 'scratch/place_page.png' });

  // Find photo buttons or covers
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a')).map(el => ({
      text: el.innerText || el.textContent || '',
      ariaLabel: el.getAttribute('aria-label') || '',
      className: el.className
    })).filter(b => b.text.includes('foto') || b.ariaLabel.includes('foto') || b.ariaLabel.includes('Foto') || b.text.includes('Fotos'));
  });

  console.log('Photo buttons found:', buttons);

  await browser.close();
}

testPlace();
