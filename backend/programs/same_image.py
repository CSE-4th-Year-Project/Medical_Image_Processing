from PIL import Image

def same_image(input_path, output_path):
    try:
        
        with Image.open(input_path) as img:
            
            img.save(output_path)
            print("Image copied successfully.")
            
    except Exception as e:
        print("Error:", e)