import cv2
import numpy as np

def weighted_bilateral_filter(input_image_path, output_image_path, diameter=3, sigmaColor=95, sigmaSpace=5):
    try:
        # Read the input image
        img = cv2.imread(input_image_path)

        # Convert the image to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Create a blank output image
        filtered_img = np.zeros_like(gray, dtype=np.float64)

        # Define the filter window size
        half_diameter = diameter // 2

        # Iterate over each pixel in the image
        for i in range(half_diameter, gray.shape[0] - half_diameter):
            for j in range(half_diameter, gray.shape[1] - half_diameter):
                # Get the central pixel intensity value
                center_pixel = gray[i, j]

                # Compute the weighted sum of nearby pixels
                weighted_sum = 0.0
                total_weight = 0.0
                for x in range(i - half_diameter, i + half_diameter + 1):
                    for y in range(j - half_diameter, j + half_diameter + 1):
                        # Calculate the intensity difference
                        intensity_diff = abs(center_pixel - gray[x, y])
                        # Calculate the spatial distance
                        spatial_distance = np.sqrt((x - i) ** 2 + (y - j) ** 2)
                        # Calculate the weight using both intensity and spatial distance
                        weight = np.exp(-(intensity_diff ** 2) / (2 * (sigmaColor ** 2))) * \
                                 np.exp(-(spatial_distance ** 2) / (2 * (sigmaSpace ** 2)))
                        # Accumulate the weighted sum and total weight
                        weighted_sum += gray[x, y] * weight
                        total_weight += weight

                # Normalize the filtered value
                filtered_img[i, j] = weighted_sum / total_weight

        # Convert the filtered image to uint8
        filtered_img = np.uint8(filtered_img)

        # Save the filtered image
        cv2.imwrite(output_image_path, filtered_img)

        print("Weighted bilateral filtering applied successfully. Image saved to:", output_image_path)

    except Exception as e:
        print("Error:", e)

