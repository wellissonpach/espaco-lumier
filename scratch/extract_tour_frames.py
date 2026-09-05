import os
import cv2
import time
from PIL import Image

def extract_frames(video_path, output_dir, step=3, quality=80):
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        print(f"Error: Could not open {video_path}")
        return 0

    total_video_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"Video {w}x{h}, FPS={fps}, Total={total_video_frames} frames. Sampling every {step} frames...")

    count = 0
    saved = 0
    start_time = time.time()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if count % step == 0:
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            img = Image.fromarray(rgb)
            out_filename = os.path.join(output_dir, f"frame_{saved:03d}.webp")
            img.save(out_filename, "WEBP", quality=quality, method=4)
            saved += 1
            if saved % 25 == 0:
                print(f"Extracted {saved} frames ({saved/(total_video_frames//step)*100:.1f}%) in {time.time()-start_time:.1f}s")

        count += 1

    cap.release()
    total_time = time.time() - start_time
    print(f"Done! Successfully extracted {saved} frames to {output_dir} in {total_time:.1f}s")
    return saved

if __name__ == "__main__":
    extract_frames("public/Video Project 13.mp4", "public/tour-frames", step=3, quality=80)
