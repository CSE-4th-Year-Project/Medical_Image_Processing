import cv2

def salt_pepper_noise(input_image_path, output_image_path, iterations=1, kernel_size=3):
    try:
        # Read the input grayscale image
        image = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
        
        # Apply median filtering iteratively
        for i in range(iterations):
            filtered_image = cv2.medianBlur(image, kernel_size)
            image = filtered_image
        
        # Save the filtered image
        cv2.imwrite(output_image_path, filtered_image)
        
        print("Salt and pepper noise removed. Filtered image saved to:", output_image_path)
    
    except Exception as e:
        print("Error:", e)
