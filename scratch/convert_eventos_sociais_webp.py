import os
from PIL import Image

src_dir = 'public/eventos sociais'
files = ['foto_013.jpg', 'foto_015.jpg']

for f in files:
    src_path = os.path.join(src_dir, f)
    im = Image.open(src_path)
    if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
        im = im.convert('RGBA')
    else:
        im = im.convert('RGB')
        
    w, h = im.size
    target_ratio = 3.0 / 4.0 # 0.75
    new_w = int(h * target_ratio)
    left = (w - new_w) // 2
    crop_box = (left, 0, left + new_w, h)

    cropped = im.crop(crop_box)
    dst_name = f.replace('.jpg', '.webp')
    dst_path = os.path.join(src_dir, dst_name)
    cropped.save(dst_path, 'WEBP', quality=88, method=6)
    print(f'{f} ({w}x{h}) -> {dst_name} ({cropped.size[0]}x{cropped.size[1]}) {os.path.getsize(dst_path)/1024:.1f} KB')

print('Eventos sociais images successfully framed and converted to 3:4 webp!')
