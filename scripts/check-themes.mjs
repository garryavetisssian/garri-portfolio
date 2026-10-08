import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
const browser=await puppeteer.launch({headless:true,executablePath:process.env.THEME_TEST_BROWSER,timeout:60000,args:['--no-sandbox']});
const page=await browser.newPage();
page.setDefaultNavigationTimeout(60000);
const origin=process.env.THEME_TEST_ORIGIN??'http://127.0.0.1:3010';
const routes=process.argv.slice(2).length?process.argv.slice(2):['/en','/en/about','/en/contact','/en/cv','/en/work/products','/en/work/entertainment','/en/work/ai-engineering','/en/work/vivaro','/en/work/soloos','/en/work/meridian-hr','/en/work/nexwave','/en/work/balvoi','/en/work/dispatch-center','/en/work/aihive','/en/work/ineed','/en/work/razer-ui','/en/work/xy-ecosystem','/en/work/spearthrone','/en/work/roos-ruckus','/en/work/duck-master','/ru/work/products','/hy/work/products'];
let failures=0;
const widths=(process.env.THEME_TEST_WIDTHS??'390,1440').split(',').map(Number);
try {
  for(const width of widths) for(const theme of ['light','dark']) {
    await page.setViewport({width,height:1000});
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    await page.goto(origin+'/en',{waitUntil:'domcontentloaded'});
    await page.evaluate(t=>localStorage.setItem('portfolio-theme',t),theme);
    for(const route of routes) {
      await page.goto(origin+route,{waitUntil:'domcontentloaded'});
      await page.waitForFunction(t=>document.documentElement.dataset.theme===t,{timeout:10000},theme);
      assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),theme);
      // Reveal viewport-triggered sections before testing the entire page.
      await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}scrollTo(0,0);});
      // Staggered entrance fades can outlast the scroll sweep. Audit settled colors,
      // not partially transparent frames composited over the grid separators.
      await new Promise(resolve=>setTimeout(resolve,1800));
      await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
      const result=await page.evaluate(async()=>await axe.run(document,{runOnly:['color-contrast'],rules:{'color-contrast':{enabled:true}}}));
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
      const errors=result.violations.flatMap(v=>v.nodes.map(n=>({target:n.target,summary:n.failureSummary})));
      if(route==='/en/work/products'&&theme==='light'&&process.env.THEME_TEST_SCREENSHOTS) {
        await mkdir(process.env.THEME_TEST_SCREENSHOTS,{recursive:true});
        await page.screenshot({path:path.join(process.env.THEME_TEST_SCREENSHOTS,`portfolio-light-${width}.png`)});
      }
      if(errors.length||overflow){failures++;console.log(JSON.stringify({route,width,theme,overflow,errors}));}
      else console.log(`PASS ${theme} ${width} ${route}`);
    }
  }
  // Actual toggle, navigation and reload persistence; keyboard activation.
  await page.setViewport({width:1440,height:1000});
  await page.goto(origin+'/en/work/products',{waitUntil:'load'});
  const previous=await page.evaluate(()=>document.documentElement.dataset.theme);
  await page.focus('nav .theme-toggle');
  await page.keyboard.press('Enter');
  await page.waitForFunction(t=>document.documentElement.dataset.theme!==t,{timeout:10000},previous);
  const selected=await page.evaluate(()=>document.documentElement.dataset.theme);
  await page.reload({waitUntil:'domcontentloaded'});
  assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),selected);
  await page.goto(origin+'/en/about',{waitUntil:'domcontentloaded'});
  assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),selected);
  console.log('PASS keyboard toggle, reload and navigation persistence');
  await page.evaluate(()=>localStorage.removeItem('portfolio-theme'));
  await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:'light'}]);
  await page.reload({waitUntil:'load'});
  assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),'light');
  await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:'dark'}]);
  await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark');
  console.log('PASS system appearance and live system changes without a saved override');
} finally { await browser.close(); }
assert.equal(failures,0,`${failures} theme/page checks failed`);
