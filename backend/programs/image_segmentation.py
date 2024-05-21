import cv2
import numpy as np

def image_segmentation(input_image_path, output_image_path, k=4):
    try:
        
        image = cv2.imread(input_image_path)
        pixels = image.reshape((-1, 3))
        pixels = np.float32(pixels)
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)
        _, labels, centers = cv2.kmeans(pixels, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)

        centers = np.uint8(centers)
        segmented_image = centers[labels.flatten()]
        segmented_image = segmented_image.reshape(image.shape)

        cv2.imwrite(output_image_path, segmented_image)
        print("Image segmented and saved as", output_image_path)
    
    except Exception as e:
        print("Error:", e)