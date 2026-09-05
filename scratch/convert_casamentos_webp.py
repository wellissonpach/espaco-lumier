import os
from PIL import Image

src_dir = 'public/casamentos'
files = sorted([f for f in os.listdir(src_dir) if f.endswith('.jpeg') or f.endswith('.jpg')])

for i, f in enumerate(files, 1):
    src_path = os.path.join(src_dir, f)
    im = Image.open(src_path)
    w, h = im.size
    target_ratio = 3.0 / 4.0 # 0.75

    current_ratio = w / h
    if current_ratio > target_ratio:
        # Image is wider than 3:4 -> crop sides
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        crop_box = (left, 0, left + new_w, h)
    else:
        # Image is taller than 3:4 -> crop top/bottom
        new_h = int(w / target_ratio)
        # Check if centering is best, or slightly bias towards top (since people/faces/arches are usually in upper 2/3)
        top = int((h - new_h) * 0.35)
        if top < 0: top = 0
        if top + new_h > h: top = h - new_h
        crop_box = (0, top, w, top + new_h)

    cropped = im.crop(crop_box)
    dst_name = f'casamento_{i:02d}.webp'
    dst_path = os.path.join(src_dir, dst_name)
    cropped.save(dst_path, 'WEBP', quality=88, method=6)
    print(f'{f} ({w}x{h}) -> {dst_name} ({cropped.size[0]}x{cropped.size[1]}) {os.path.getsize(dst_path)/1024:.1f} KB')

print('All 8 casamento images converted and framed to 3:4 webp!')
