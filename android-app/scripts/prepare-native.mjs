import { readFile, writeFile, mkdir, cp, access } from 'node:fs/promises';
import { join } from 'node:path';
const root='android';
const activity=join(root,'app/src/main/java/eu/design8s2/worldsoccer/MainActivity.java');
await mkdir(join(root,'app/src/main/java/eu/design8s2/worldsoccer'),{recursive:true});
await writeFile(activity,`package eu.design8s2.worldsoccer;
import android.os.Bundle;
import android.view.View;
import com.getcapacitor.BridgeActivity;
public class MainActivity extends BridgeActivity {
  private void immersive() {
    getWindow().getDecorView().setSystemUiVisibility(
      View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
      View.SYSTEM_UI_FLAG_FULLSCREEN |
      View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
      View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
      View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
      View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
  }
  @Override public void onCreate(Bundle state) { super.onCreate(state); immersive(); }
  @Override public void onWindowFocusChanged(boolean focused) {
    super.onWindowFocusChanged(focused);
    if (focused) immersive();
  }
}
`);
const file='www/index.html';
let html=await readFile(file,'utf8');
const injected=`<script>
(function(){
  document.documentElement.classList.add('android-native-app');
  function hideInstall(){
    document.querySelectorAll('button,a,[role="button"]').forEach(function(el){
      const label=(el.textContent||'').trim().replace(/\\s+/g,' ').toLowerCase();
      if (/^installa (il )?gioco$/.test(label)) {
        el.style.setProperty('display','none','important');
        el.setAttribute('aria-hidden','true');
      }
    });
  }
  document.addEventListener('DOMContentLoaded',function(){
    hideInstall();
    new MutationObserver(hideInstall).observe(document.body,{childList:true,subtree:true});
  });
})();
</script>`;
html=html.replace(/<\/body>/i,injected+'</body>');
await writeFile(file,html);
console.log('Android fullscreen and native install-button adjustment prepared');
