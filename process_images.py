import os
from PIL import Image, ImageEnhance
from rembg import remove

# Directories
input_dir = 'photo'
output_dir = 'assets/images'

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

print("Starting image processing...")

for filename in os.listdir(input_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        print(f"Processing {filename}...")
        input_path = os.path.join(input_dir, filename)
        output_filename = os.path.splitext(filename)[0].replace(" ", "_") + ".png"
        output_path = os.path.join(output_dir, output_filename)
        
        try:
            # 1. Open Image
            img = Image.open(input_path)
            
            # 2. Enhance image (Brightness, Contrast, Sharpness) slightly for premium look
            # Brightness
            enhancer = ImageEnhance.Brightness(img)
            img_enhanced = enhancer.enhance(1.05)
            
            # Contrast
            enhancer = ImageEnhance.Contrast(img_enhanced)
            img_enhanced = enhancer.enhance(1.1)
            
            # Sharpness
            enhancer = ImageEnhance.Sharpness(img_enhanced)
            img_enhanced = enhancer.enhance(1.2)
            
            # 3. Remove Background
            print(f"Removing background from {filename}...")
            output_img = remove(img_enhanced)
            
            # 4. Save Image
            output_img.save(output_path, "PNG")
            print(f"Saved processed image to {output_path}")
            
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print("Image processing complete!")
