const CACHE='8s2-mobile-v256236';
const FILES=['./','./index.html','./training-ambience.mp3','./sfondomenu.png','./manifest.webmanifest','./app-icon-192.png','./app-icon-512.png','./app-icon-180.png','./app-icon-32.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(async c=>{for(const path of FILES){const r=await fetch(new Request(path,{cache:'reload'}));if(!r.ok)throw Error('Offline download failed');await c.put(path,r);}}).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('8s2-mobile-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
async function refreshGame(){
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),8000);
 try{const response=await fetch(new Request('./index.html',{cache:'no-store',signal:controller.signal}));if(!response.ok)throw Error('Page unavailable');const cache=await caches.open(CACHE);await cache.put('./index.html',response.clone());return response;}finally{clearTimeout(timeout);}
}
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){
  const cached=caches.open(CACHE).then(c=>c.match('./index.html'));
  const fresh=refreshGame();
  e.waitUntil(fresh.then(()=>{},()=>{}));
  e.respondWith(cached.then(async response=>{if(response)return response;try{return await fresh;}catch(error){return (await caches.match('./index.html'))||Response.error();}}));return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});



