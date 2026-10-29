from PIL import Image
from pathlib import Path
root=Path('android/app/src/main/res')
source=Image.open('../app-icon-512.png').convert('RGBA')
for density,size in [('mdpi',48),('hdpi',72),('xhdpi',96),('xxhdpi',144),('xxxhdpi',192)]:
    folder=root/f'mipmap-{density}'
    folder.mkdir(parents=True,exist_ok=True)
    icon=source.resize((size,size),Image.Resampling.LANCZOS)
    icon.save(folder/'ic_launcher.png')
    icon.save(folder/'ic_launcher_round.png')
    foreground=source.resize((int(size*0.72),int(size*0.72)),Image.Resampling.LANCZOS)
    canvas=Image.new('RGBA',(size,size),(19,112,34,255))
    canvas.alpha_composite(foreground,((size-foreground.width)//2,(size-foreground.height)//2))
    canvas.save(folder/'ic_launcher_foreground.png')
print('Official 8S2 World Soccer Android launcher icons generated')
