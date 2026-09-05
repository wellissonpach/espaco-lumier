import os
from PIL import Image

src_dir = 'public/hall2'
files = sorted([f for f in os.listdir(src_dir) if f.endswith('.jpeg') or f.endswith('.jpg') or f.endswith('.webp')])

print(f'Found {len(files)} files in {src_dir}: {files}')

for i, f in enumerate(files, 1):
    src_path = os.path.join(src_dir, f)
    im = Image.open(src_path)
    if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
        im = im.convert('RGBA')
    else:
        im = im.convert('RGB')
        
    w, h = im.size
    target_ratio = 4.0 / 3.0 # 1.33333

    current_ratio = w / h
    if current_ratio > target_ratio:
        # Image is wider than 4:3 -> crop sides (center)
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        crop_box = (left, 0, left + new_w, h)
    else:
        # Image is taller than 4:3 (like hall.webp vertical) -> crop top/bottom
        # For hall.webp, keep middle/upper section where chandeliers and tables are
        new_h = int(w / target_ratio)
        top = int((h - new_h) * 0.4)
        if top < 0: top = 0
        if top + new_h > h: top = h - new_h
        crop_box = (0, top, w, top + new_h)

    cropped = im.crop(crop_box)
    dst_name = f'hall2_{i:02d}.webp'
    dst_path = os.path.join(src_dir, dst_name)
    cropped.save(dst_path, 'WEBP', quality=88, method=6)
    print(f'{f} ({w}x{h}) -> {dst_name} ({cropped.size[0]}x{cropped.size[1]}) {os.path.getsize(dst_path)/1024:.1f} KB')

print('All hall2 images successfully framed and converted to 4:3 webp!')
