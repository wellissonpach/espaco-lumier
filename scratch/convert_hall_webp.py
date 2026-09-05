import os
from PIL import Image

hall_dir = 'public/hall'

images = [
    ('autoridade.jpeg', 'autoridade.webp'),
    ('foto_068.jpg', 'foto_068.webp'),
    ('WhatsApp Image 2026-09-04 at 14.10.02.jpeg', 'hall_decoracao.webp'),
]

for src_name, dst_name in images:
    src_path = os.path.join(hall_dir, src_name)
    dst_path = os.path.join(hall_dir, dst_name)
    if os.path.exists(src_path):
        im = Image.open(src_path)
        # Convert RGB if necessary
        if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
            im = im.convert('RGBA')
        else:
            im = im.convert('RGB')
        
        # Save as webp with high quality
        im.save(dst_path, 'WEBP', quality=88, method=6)
        print(f'Converted {src_name} -> {dst_name} ({os.path.getsize(dst_path)/1024:.1f} KB)')

print('Done converting images to webp!')
