import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

const origin=process.env.THEME_TEST_ORIGIN??'http://127.0.0.1:3011';
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});
try {
  const page=await browser.newPage();
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  for(const locale of ['en','ru','hy']) {
    for(const [collection,section,folder] of [['products','protocols','2 XY Protocols'],['entertainment','xygo','1 XYGO - WEB3 Lottery']]) {
      await page.goto(`${origin}/${locale}/work/${collection}`,{waitUntil:'networkidle2'});
      const href=await page.$eval(`a[href*="/work/xy-ecosystem"]`,el=>el.getAttribute('href'));
      assert.equal(href,`/${locale}/work/xy-ecosystem#${section}`);
      await page.click(`a[href="${href}"]`);
      await page.waitForFunction(s=>location.hash===`#${s}`,{},section);
      const expected=`/cases/xy-ecosystem/${encodeURIComponent(folder)}/`;
      await page.waitForFunction(prefix=>[...document.querySelectorAll('img')].some(img=>img.getAttribute('src')?.startsWith(prefix)),{},expected);
      assert.equal(await page.$eval('.case-tab-strip button[aria-pressed="true"]',el=>[...el.parentNode.children].indexOf(el)),section==='protocols'?0:1);
      await page.reload({waitUntil:'networkidle2'});
      assert.equal(await page.$eval('.case-tab-strip button[aria-pressed="true"]',el=>[...el.parentNode.children].indexOf(el)),section==='protocols'?0:1);
      await page.click(`.case-tab-strip button:nth-child(${section==='protocols'?2:1})`);
      assert.equal(new URL(page.url()).hash,section==='protocols'?'#xygo':'#protocols');
      console.log(`PASS ${locale} ${collection}: matching cover/gallery, refresh and tab switch`);
    }
  }
  await page.goto(`${origin}/en/work/xy-ecosystem`,{waitUntil:'networkidle2'});
  assert.equal(await page.$eval('.case-tab-strip button[aria-pressed="true"]',el=>[...el.parentNode.children].indexOf(el)),0);
  console.log('PASS direct XY case opens Protocols first');
} finally { await browser.close(); }
