import cv2
import numpy as np

def dual_range_kernel(img, theta):
    dr_img = cv2.ximgproc.jointBilateralFilter(img, img, 3, 10, theta)
    return dr_img

def doAvgFilter(img, l):
    return cv2.blur(img, (l, l))

def SURE(img, theta):
    sigma_sq = theta ** 2
    sure_sum = np.sum(np.abs(cv2.Laplacian(img, cv2.CV_64F)) ** 2)
    sure_sum += 2 * sigma_sq * np.sum(np.abs(cv2.Sobel(img, cv2.CV_64F, 1, 0)) ** 2)
    sure_sum += 2 * sigma_sq * np.sum(np.abs(cv2.Sobel(img, cv2.CV_64F, 0, 1)) ** 2)
    return sure_sum


def DR_OWBF(noisy_img, w, l):
    primary_denoised_img = doAvgFilter(noisy_img, l)
    
    optimal_theta = None
    min_sure = float('inf')
    
    for theta in np.arange(0.01, 1.0, 0.01):
        sure = SURE(primary_denoised_img, theta)
        if sure < min_sure:
            min_sure = sure
            optimal_theta = theta
    
    final_denoised_img = (1 - optimal_theta) * primary_denoised_img + optimal_theta * noisy_img
    
    return final_denoised_img

import cv2

def gaussian_noise(input_image_path, output_image_path):
    try:
        w = 3  # Window width
        l = 5  # Averaging kernel size
        
        image = cv2.imread(input_image_path)
        
        filtered_image = DR_OWBF(image, w, l)

        # Save the filtered image
        cv2.imwrite(output_image_path, filtered_image)

        print("Gaussian noise removed. Filtered image saved to:", output_image_path)
    
    except Exception as e:
        print("Error:", e)







