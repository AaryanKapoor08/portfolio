import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.addInitScript(() => {
  try { localStorage.setItem('vite-ui-theme', 'dark'); localStorage.setItem('theme', 'dark'); } catch {}
});
await p.goto('http://localhost:8123/', { waitUntil: 'networkidle' });
await p.emulateMedia({ colorScheme: 'dark' });
await p.waitForTimeout(2600);
// Force the dark class in case the storage key differs.
await p.evaluate(() => document.documentElement.classList.add('dark'));
await p.waitForTimeout(1200);
await p.screenshot({ path: 'scripts/dark-hero.png' });
await p.evaluate(() => document.getElementById('play')?.scrollIntoView({ block: 'center' }));
await p.waitForTimeout(3200);
await p.screenshot({ path: 'scripts/dark-play.png' });
await b.close();
console.log('dark shots done');
