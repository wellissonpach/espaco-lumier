import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'https://www.google.com/maps/place/Espaco+Lumier/@-15.802027,-48.0427106,3a,84.6y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIC-ipHv8QE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWnbAuRWwt2gkgXxk95gq24PQf3RN-nJxcW6MwKNiTPocFJ-gyAwOHdiVuHP39KZIVh7JuYzx_xyjBPU-xk5LRZoFaDLj8Rwk9fOUa6FQYBC3SgKrvQzQJq85MRshCtdtc_gd6wVfQ%3Dw203-h135-k-no!7i960!8i640!4m18!1m8!3m7!1s0x935a32f61fec68cd:0xdb473c431db6d1cb!2sEspaco+Lumier!8m2!3d-15.8020342!4d-48.042887!10e5!16s%2Fg%2F11b6j772rg!3m8!1s0x935a32f61fec68cd:0xdb473c431db6d1cb!8m2!3d-15.8020342!4d-48.042887!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11b6j772rg?entry=ttu';

async function inspect() {
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

  await page.screenshot({ path: 'scratch/maps_page.png' });
  console.log('Screenshot saved to scratch/maps_page.png');

  // Let's inspect all clickable tabs/buttons
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a, div[role="tab"]')).map(el => ({
      tag: el.tagName,
      text: el.innerText || el.textContent || '',
      ariaLabel: el.getAttribute('aria-label') || '',
      role: el.getAttribute('role') || ''
    })).filter(b => b.text.trim() || b.ariaLabel.trim());
  });

  fs.writeFileSync('scratch/buttons.json', JSON.stringify(buttons, null, 2));
  console.log('Buttons count:', buttons.length);

  await browser.close();
}

inspect();
