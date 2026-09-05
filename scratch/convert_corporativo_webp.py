import os
from PIL import Image

src_dir = 'public/eventos corporativos'
src_file = os.path.join(src_dir, 'foto_025.jpg')
dst_file = os.path.join(src_dir, 'foto_025.webp')

im = Image.open(src_file)
if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
    im = im.convert('RGBA')
else:
    im = im.convert('RGB')

w, h = im.size # 2048 x 1150
target_ratio = 3.0 / 4.0 # 0.75
new_w = int(h * target_ratio) # 862 px
left = (w - new_w) // 2
crop_box = (left, 0, left + new_w, h)

cropped = im.crop(crop_box)
cropped.save(dst_file, 'WEBP', quality=88, method=6)

print(f'Converted foto_025.jpg ({w}x{h}) -> foto_025.webp ({cropped.size[0]}x{cropped.size[1]}) {os.path.getsize(dst_file)/1024:.1f} KB')
