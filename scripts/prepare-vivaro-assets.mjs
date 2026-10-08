// Mechanical web export of the supplied design boards; source artwork is unchanged.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const root = '/var/folders/0_/v48bh3256dl2xzb7jy1gp9r00000gn/T/';
const output = 'public/cases/vivaro';
const assets = {
  feed:'f691d13d-8cd3-4af6-81c9-80f02e585fc0', casino:'32b09d37-aabb-4a51-a4bc-84bc99590273', live:'24d919bf-4f76-4a2d-84bf-06ba4388e7dc', sports:'a43c9bde-61ee-46fa-90b7-4f6d07b7e6fb',
  palette:'671ae81c-f590-4928-858d-36c129eceab5', typography:'6987ecb8-f40f-46af-a82a-34fed4b0b9c5', buttons:'180413f6-0b12-40dc-8ffc-d3a0821211c7', tabs:'b1ab3bdf-590a-4add-bc6e-c632ab00ae58', logo:'4f8cbf51-011a-4f1f-9a4e-d9d4b6bbe2da', sidebar:'83364915-07e6-43f0-840f-013a8ac37901', stories:'9f8d974f-53e9-424f-b0b6-743c35f75213', banners:'679745b0-a812-4c3c-996e-8b665d8c4afc', headers:'96732951-fdd2-4ca9-b758-16a89faca256', dock:'d3da7092-9f99-4b6c-8744-d613169038e8', cards:'6806e2e8-4116-4005-8cd0-49c6edbcb85b', modes:'c23dfe50-c3cd-4639-abe8-d11ae0043c9b', search:'ac08d654-93c1-4172-b7f9-d8616596e844', categories:'512999f6-b8f7-42b4-b7e2-b42cb8bc2d27', assistant:'a22207e2-d03b-4983-88b2-9df278412a86', quick:'43dab6c5-da98-4d92-8a20-d0ffd53aef2c', wins:'30264bc9-08a2-469c-8234-958205fb5813', rewards:'2bc79c12-0c9d-40be-a3c7-47282adee49e', challenges:'54ddf1c0-8ef8-4f94-b4b3-35ccb65821ee', footer:'9a7fd514-9da9-4d35-8c18-7d093483abd7', 'wire-feed':'69cba32f-05e5-4d95-bcd3-3e344e36f27d', 'wire-casino':'d31baec2-579f-476d-8903-891367a24971', 'wire-live':'68b2aef0-191f-44c5-8d49-4cf72e1b57ad', 'wire-sports':'e3c6f0f2-f90a-4581-9fe4-b1efbf7147f3',
};
await mkdir(output,{recursive:true});
for (const [name,id] of Object.entries(assets)) {
  const path = `${root}codex-clipboard-${id}.png`;
  await sharp(path).resize({width:1600,withoutEnlargement:true}).webp({quality:88}).toFile(`${output}/${name}.webp`);
  if (['feed','casino','live','sports'].includes(name)) {
    const metadata = await sharp(path).metadata();
    const {data,info}=await sharp(path).extract({left:0,top:0,width:2880,height:metadata.height}).resize({width:720}).removeAlpha().raw().toBuffer({resolveWithObject:true});
    let bottom=info.height-1;
    for (;bottom>0;bottom--) { let nonBlack=false; for(let x=0;x<info.width*info.channels;x++) if(data[bottom*info.width*info.channels+x]>20){nonBlack=true;break;} if(nonBlack)break; }
    const height=Math.min(metadata.height,Math.ceil((bottom+1)*2880/720));
    await sharp(path).extract({left:0,top:0,width:2880,height}).resize({width:1600}).webp({quality:90}).toFile(`${output}/${name}-desktop.webp`);
    await sharp(path).extract({left:2960,top:0,width:750,height:metadata.height}).resize({width:600}).webp({quality:90}).toFile(`${output}/${name}-mobile.webp`);
    if(name==='feed') await sharp(path).extract({left:396,top:1640,width:2088,height:1305}).resize({width:1600}).webp({quality:90}).toFile(`${output}/Cover.webp`);
  }
}
console.log(`Exported ${Object.keys(assets).length} distinct boards and responsive screen crops.`);
