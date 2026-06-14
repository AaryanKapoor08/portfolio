import { chromium } from '@playwright/test';

const url = process.argv[2] || 'http://localhost:8123/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });

const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

await page.goto(url, { waitUntil: 'networkidle' });
// Skip intro splash if present
await page.waitForTimeout(2200);

// Scroll to the play section so it mounts.
await page.evaluate(() => document.getElementById('play')?.scrollIntoView({ behavior: 'instant', block: 'center' }));
await page.waitForTimeout(3500); // let WebGL warm up + autorotate

const canvasCount = await page.evaluate(() => document.querySelectorAll('#play canvas').length);
await page.screenshot({ path: 'scripts/play-shot.png' });

// Also grab the hero.
await page.evaluate(() => window.scrollTo({ top: 0 }));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'scripts/hero-shot.png' });

console.log('play canvases:', canvasCount);
console.log('console errors:', errors.length ? errors.slice(0, 8).join('\n') : 'none');
await browser.close();
