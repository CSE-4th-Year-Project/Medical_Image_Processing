import cv2

def clahe_contrast_enhancement(input_path, output_path):
    try:
        # Read the input image
        img = cv2.imread(input_path)
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(gray)
        
        # Save the enhanced image
        cv2.imwrite(output_path, enhanced)

        print("Contrast Enhancement Image generated successfully:", output_path)
        
    except Exception as e:
        print("Error:", e)
