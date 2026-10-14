import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});
const origin=process.env.THEME_TEST_ORIGIN??'http://127.0.0.1:3011';
try {
 let page=await browser.newPage();
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 for(const locale of process.env.KENO_CHECK_INTERACTIONS_ONLY?[]:['en','ru','hy']) for(const width of [390,1440]) {
  await page.close();page=await browser.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  await page.setViewport({width,height:1000});
  await page.goto(`${origin}/${locale}/work/keno`,{waitUntil:'networkidle2'});
  for(const theme of ['light','dark']) {
   await page.evaluate(t=>{document.documentElement.dataset.theme=t;},theme);
   for(const img of await page.$$('article img')) {
    await img.evaluate(i=>i.scrollIntoView({block:'center'}));
    try { await page.waitForFunction(i=>i.complete&&i.naturalWidth>0,{},img); }
    catch(error) { console.error(await img.evaluate(i=>({src:i.currentSrc,source:i.getAttribute('src'),complete:i.complete,width:i.naturalWidth,rect:i.getBoundingClientRect().toJSON()})));throw error; }
   }
   await page.evaluate(()=>scrollTo(0,0));
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'overflow');
   await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   const violations=await page.evaluate(async()=> (await axe.run(document.querySelector('article'),{runOnly:['color-contrast']})).violations);
   assert.deepEqual(violations,[],`${locale} ${width} ${theme} contrast`);
   console.log(`PASS ${locale} ${width} ${theme}: loaded images, contrast, layout`);
  }
 }
 await page.setViewport({width:1440,height:1000});
 await page.goto(`${origin}/en/work/keno`,{waitUntil:'networkidle2'});
 await page.click('#grid button:nth-child(2)');
 await page.waitForFunction(()=>document.querySelector('#grid img[alt="After the draw"]'));
 await page.click('#experience button:nth-child(2)');
 await page.waitForFunction(()=>document.querySelector('#experience a[aria-label="Open original: After the draw"]'));
 await page.$eval('video',v=>v.scrollIntoView({block:'center'}));
 await page.evaluate(async()=>{const v=document.querySelector('video');v.muted=true;await v.play();});
 await page.waitForFunction(()=>document.querySelector('video').currentTime>0.2);
 const video=await page.evaluate(()=>{const v=document.querySelector('video');v.pause();return {time:v.currentTime,error:v.error?.message,duration:v.duration,width:v.videoWidth,height:v.videoHeight};});
 assert.ok(video.time>0);assert.ok(!video.error);console.log('PASS video playback',video);
 const sources=await page.evaluate(()=>[...document.querySelectorAll('article img, article video')].map(el=>{const u=new URL(el.getAttribute('src'),location.href);return decodeURIComponent(u.searchParams.get('url')??u.pathname);}));
 for(const name of ['Cover.png','Slide 1.png','Slide 2.png','Slide 3.png','KENO.mov']) assert.ok(sources.some(src=>src.endsWith(name)),name);
 assert.equal(await page.$eval('article a',a=>a.getAttribute('href')),'/en/work/entertainment');
 await page.goto(`${origin}/en/work/entertainment`,{waitUntil:'networkidle2'});assert.ok(await page.$('[role="tabpanel"] a[href="/en/work/keno"]'));
 await page.goto(`${origin}/en/work/products`,{waitUntil:'networkidle2'});assert.equal(await page.$('[role="tabpanel"] a[href="/en/work/keno"]'),null);
 assert.deepEqual(errors,[]);console.log('PASS asset coverage, state comparisons, collections, breadcrumbs and no page errors');
 await page.goto(`${origin}/en/work/keno`,{waitUntil:'networkidle2'});
 await page.screenshot({path:'/Users/garryavetissian/.codex/visualizations/2026/10/06/01a11239-3a22-7fa1-afe5-33c57b76ef5f/keno-desktop.png'});
} finally {await browser.close();}
