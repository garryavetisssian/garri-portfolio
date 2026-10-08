import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import sharp from 'sharp';

const source=readFileSync('src/data/vivaro.ts','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const context={exports:{}};
vm.runInNewContext(compiled,context);
for(const locale of ['en','ru','hy']) {
  const project=context.exports.getVivaroProject(locale);
  const copy=context.exports.vivaroCopy[locale];
  assert.equal(project.slug,'vivaro');
  assert.equal(copy.screenLabels.length,4);
  assert.equal(copy.screenNotes.length,4);
  assert.equal(copy.decisions.length,3);
  assert.equal(copy.limits.length,4);
  assert(project.subtitle.length>40);
  assert(!project.category.includes('AI'));
  assert(existsSync(`public${project.thumbnail}`));
}
for(const name of ['feed','casino','live','sports']) {
  for(const device of ['desktop','mobile']) {
    const meta=await sharp(`public/cases/vivaro/${name}-${device}.webp`).metadata();
    assert.equal(meta.width,device==='desktop'?1600:600);
    assert(meta.height>meta.width);
  }
}
for(const file of readdirSync('public/cases/vivaro').filter(file=>file.endsWith('.webp'))) {
  const meta=await sharp(`public/cases/vivaro/${file}`).metadata();
  assert(meta.width>0 && meta.height>0);
}
const component=readFileSync('src/components/brut/VivaroCase.tsx','utf8');
for(const match of component.matchAll(/name="([\w-]+)"/g)) assert(existsSync(`public/cases/vivaro/${match[1]}.webp`));
assert(readFileSync('src/components/brut/WorkList.tsx','utf8').includes('vivaro: { collections: ["products", "entertainment"], cover: "/cases/vivaro/Cover.png"'));
const cover=await sharp('public/cases/vivaro/Cover.png').metadata();
assert.equal(cover.width,3840);
assert.equal(cover.height,2160);
const ordering={exports:{}};
vm.runInNewContext(ts.transpileModule(readFileSync('src/lib/work-order.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2023}}).outputText,ordering);
const items=['vivaro','roos-ruckus','spearthrone','xy-ecosystem','duck-master'].map(slug=>({slug}));
assert.deepEqual(Array.from(ordering.exports.orderCollectionItems(items,'entertainment'),item=>item.slug),['roos-ruckus','spearthrone','vivaro','xy-ecosystem','duck-master']);
assert.equal(ordering.exports.orderCollectionItems(items,'products'),items);
assert.equal(items[0].slug,'vivaro');
assert(readFileSync('src/data/projects.i18n.ts','utf8').includes('if (slug === "vivaro") return getVivaroProject(locale)'));
assert(readFileSync('src/app/[locale]/work/[slug]/page.tsx','utf8').includes('if (slug === "vivaro") return <VivaroCase'));
console.log('PASS: all three locales, collection and route integration, all exported assets and responsive screen dimensions.');
