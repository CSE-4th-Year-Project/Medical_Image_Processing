import cv2
import numpy as np

from programs.image_segmentation import image_segmentation

def analysis(input_image_path, output_image_path, delta=20):
    try:
        # Segment the input image
        image_segmentation(input_image_path, output_image_path)
        
        # Read the segmented image
        image = cv2.imread(output_image_path, cv2.IMREAD_GRAYSCALE)
        
        # Find the maximum intensity value in the image
        max_intensity = image.max()
        
        # Create a binary mask where pixels within the intensity range become white
        mask = ((image >= max_intensity - delta) & (image <= max_intensity) & (image >= 200)).astype(np.uint8) * 255
        
        # Apply closing operation to fill gaps and smooth edges
        kernel_close = np.ones((5, 5), np.uint8)
        closed_mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel_close)
        
        # Apply opening operation to remove noise and isolate regions
        kernel_open = np.ones((5, 5), np.uint8)
        opened_mask = cv2.morphologyEx(closed_mask, cv2.MORPH_OPEN, kernel_open)
        
        # Save the enhanced mask as the output image
        cv2.imwrite(output_image_path, opened_mask)
        print("Image processed and saved as", output_image_path)
        return "The white pixels denote Tumor Region"
    
    except Exception as e:
        print("Error:", e)
