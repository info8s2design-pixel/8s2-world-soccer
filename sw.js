const CACHE='8s2-mobile-v256478';
const FILES=['./','./index.html','./training-ambience.mp3','./penalty-ambience.mp3','./champions-menu.mp3','./champions-logo.png','./asset459-60fbe9bdd24e.png','./asset459-98985cbbda62.jpg','./asset477-4fd2ffa661a5.png','./asset459-29b794414045.png','./asset459-3352d31143d8.png','./asset459-f5088a2dc3c5.mp3','./asset459-a59a2172e827.mp3','./asset459-4482eb183fcf.png','./asset459-3cde1635f65b.mp3','./asset459-759852e8981c.mp3','./asset459-329e060c53b3.mp3','./asset459-125538d200ed.mp3','./asset459-4f7fd96e86c5.mp3','./asset459-ce3e1eaf9036.mp3','./asset459-e2026716b546.mp3','./asset459-854e0c4bfffb.mp3','./asset459-7dc58de73ffa.mp3','./asset459-f4e0a7d5ca42.mp3','./asset459-1a2cff58782e.wav','./asset459-f1343e65beef.mp3','./asset459-e181a82ea189.mp3','./asset459-5646f95d4de6.mp3','./net-impact.mp3','./entrance-horn.mp3','./beach-ambience.mp3','./beach-halftime.mp3','./stadium-texture395.jpg','./net-impact.mp3','./entrance-horn.mp3','./beach-ambience.mp3','./stadium-texture378.jpg','./net-impact.mp3','./entrance-horn.mp3','./stadium-texture361.jpg','./net-impact.mp3','./entrance-horn.mp3','./stadium-texture354.jpg','./net-impact.mp3','./entrance-horn.mp3','./stadium-texture353.jpg','./net-impact.mp3','./stadium-texture329.jpg','./net-impact.mp3','./stadium-texture328.jpg','./net-impact.mp3','./stadium-texture327.jpg','./net-impact.mp3','./stadium-texture322.jpg','./post-impact.wav','./shot-impact.wav','./sfondomenu.png','./manifest.webmanifest','./app-icon-192.png','./app-icon-512.png','./app-icon-180.png','./app-icon-32.png'];
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




