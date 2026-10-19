const CACHE='8s2-mobile-v265560';
const VERSION='2.56.655';
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 for(const url of ['./index.html','./manifest.webmanifest','./app-icon-180.png','./app-icon-32.png']){
  const response=await fetch(new Request(url,{cache:'reload'}));
  if(!response.ok)throw Error('Offline preparation failed');
  await cache.put(url,response);
 }
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('message',event=>{
 if(event.data?.type==='GET_GAME_VERSION'&&event.source)event.source.postMessage({type:'GAME_VERSION',version:VERSION});
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  if(req.mode==='navigate'){
   // Installation already fetches this version's page. Never wait on the network at launch.
   const saved=await cache.match('./index.html');
   if(saved)return saved;
   const controller=new AbortController();
   let timer;
   try{
    const response=await Promise.race([
     fetch(new Request(req,{cache:'no-store',signal:controller.signal})),
     new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Startup timeout'));},6000);})
    ]);
    if(!response.ok)throw Error('Navigation unavailable');
    event.waitUntil(cache.put('./index.html',response.clone()).catch(()=>{}));
    return response;
   }catch(error){
    const previous=await caches.match('./index.html');
    if(previous)return previous;
    throw error;
   }finally{clearTimeout(timer);}
  }
  // Keep previously downloaded game media available during an update, including offline launches.
  const saved=await cache.match(req)||await caches.match(req);
  if(saved)return saved;
  const response=await fetch(req);
  if(response.ok)event.waitUntil(cache.put(req,response.clone()).catch(()=>{}));
  return response;
 })());
});
