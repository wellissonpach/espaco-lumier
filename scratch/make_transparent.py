from PIL import Image
import math

def remove_black_background(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    data = img.load()

    # Create new image with RGBA
    out = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    out_data = out.load()

    for y in range(height):
        for x in range(width):
            r, g, b, a = data[x, y]
            # Luminance calculation
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            
            # Gold color characteristics: r > b, g > b
            # Background is very dark (lum < 35)
            # We want a smooth alpha curve
            if lum <= 20:
                out_data[x, y] = (0, 0, 0, 0)
            elif lum >= 80:
                out_data[x, y] = (r, g, b, 255)
            else:
                # Smooth interpolation for anti-aliasing
                alpha = int(((lum - 20) / (80 - 20)) * 255)
                # Slightly brighten dark edges so they don't look muddy
                scale = 255.0 / max(lum, 1.0)
                adj_r = min(255, int(r * (1 + 0.3 * (1 - alpha/255.0))))
                adj_g = min(255, int(g * (1 + 0.3 * (1 - alpha/255.0))))
                adj_b = min(255, int(b * (1 + 0.3 * (1 - alpha/255.0))))
                out_data[x, y] = (adj_r, adj_g, adj_b, alpha)

    out.save(output_path, 'PNG')
    print(f"Saved transparent logo to {output_path}")

if __name__ == '__main__':
    remove_black_background('public/logo espaco-lumier.png', 'public/logo-espaco-lumier-transparent.png')
