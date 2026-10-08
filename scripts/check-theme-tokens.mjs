import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css=readFileSync('src/app/globals.css','utf8');
const blocks=[['dark',css.match(/:root \{([\s\S]*?)\n\}/)[1]],['light',css.match(/:root\[data-theme="light"\] \{([\s\S]*?)\n\}/)[1]]];
function rgb(value) {
  if(value.startsWith('#')) return value.slice(1).match(/../g).map(v=>parseInt(v,16));
  return value.match(/[\d.]+/g).map(Number);
}
function luminance(color){return color.slice(0,3).map(c=>{c/=255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;}).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i],0);}
function contrast(fg,bg) { if(fg.length===4) fg=fg.slice(0,3).map((c,i)=>c*fg[3]+bg[i]*(1-fg[3]));const a=luminance(fg),b=luminance(bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05); }
let pairs=0;
for(const [theme,block] of blocks){
  const tokens=Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(m=>[m[1],m[2]]));
  for(const surface of ['paper','paper-soft','paper-elev']) {
    const bg=rgb(tokens[surface]);
    for(const name of ['ink','ink-mute','ink-faint','acid','warn','game-violet','game-cyan','game-rose','game-green','game-lilac','game-blue']) {
      const ratio=contrast(rgb(tokens[name]),bg);assert(ratio>=4.5,`${theme} ${name} on ${surface}: ${ratio.toFixed(2)}`);pairs++;
    }
    const boundary=contrast(rgb(tokens['line-strong']),bg);assert(boundary>=3,`${theme} control boundary on ${surface}: ${boundary.toFixed(2)}`);pairs++;
  }
}
console.log(`PASS ${pairs} text and control-boundary token combinations across both themes.`);
