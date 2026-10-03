import fs from 'node:fs';
import path from 'node:path';
const directory=path.resolve('dist');
const html=fs.readFileSync(path.join(directory,'index.html'),'utf8');
const references=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]);
let count=0;
for(const ref of references){
  if(/^(?:https?:|mailto:|data:|#)/.test(ref))continue;
  if(ref.startsWith('/'))throw Error(`Root-relative asset breaks project Pages: ${ref}`);
  const asset=path.resolve(directory,ref.split(/[?#]/)[0]);
  if(!asset.startsWith(directory+path.sep))throw Error(`Asset outside website: ${ref}`);
  if(!fs.statSync(asset,{throwIfNoEntry:false})?.isFile())throw Error(`Missing local asset: ${ref}`);
  count++;
}
if(!html.includes('lang="zh-CN"'))throw Error('Missing Chinese document language');
if(!html.includes('name="viewport"'))throw Error('Missing responsive viewport');
if(!fs.existsSync(path.join(directory,'.nojekyll')))throw Error('Missing .nojekyll');
console.log(`PASS: ${count} local references resolve; project-path assets, Chinese language and viewport verified.`);
