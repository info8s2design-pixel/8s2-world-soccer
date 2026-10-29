import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root=resolve('..');
const out=resolve('www');
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
const skip=new Set(['.git','.github','android-app','node_modules','.gitignore','README.md','LICENSE']);
for(const entry of await readdir(root,{withFileTypes:true})){
 if(skip.has(entry.name)||entry.name.startsWith('.')) continue;
 if(entry.isFile() && !/\.(html|css|js|json|png|jpe?g|webp|svg|ico|gif|mp3|wav|ogg|mp4|webm|woff2?|ttf|wasm|xml|webmanifest)$/i.test(entry.name)) continue;
 await cp(join(root,entry.name),join(out,entry.name),{recursive:true});
}
try { await stat(join(out,'index.html')); } catch { throw new Error('index.html non trovato nella radice del repository'); }
console.log('Risorse web copiate in android-app/www');
