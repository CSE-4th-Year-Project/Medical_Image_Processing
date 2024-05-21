import cv2
import numpy as np

def qhe_contrast_enhancement(input_path, output_path):
    try:
        # Read the input image
        img = cv2.imread(input_path, cv2.IMREAD_GRAYSCALE)
        
        # Compute the histogram of the grayscale image
        hist, bins = np.histogram(img.flatten(), 256, [0,256])
        
        # Compute the cumulative distribution function (CDF) of the histogram
        cdf = hist.cumsum()
        
        # Normalize the CDF to the range [0, 1]
        cdf_normalized = cdf / cdf.max()
        
        # Compute the transformation function using quadratic interpolation
        transform = np.interp(cdf_normalized, np.linspace(0, 1, 256), np.linspace(0, 1, 256)) ** 2
        
        # Apply the transformation to the input image
        img_enhanced = np.interp(img.flatten(), np.arange(256), 255 * transform).reshape(img.shape).astype(np.uint8)
        
        # Save the enhanced image
        cv2.imwrite(output_path, img_enhanced)

        print("Image generated successfully:", output_path)
        
    except Exception as e:
        print("Error:", e)

