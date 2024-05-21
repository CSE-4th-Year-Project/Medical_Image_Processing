import cv2
import numpy as np

def main(img):
    B = 2
    
    
    r, c = img.shape

    hist, _ = np.histogram(img, bins=range(257))

    pdf = hist / (r * c)
    Pmax = np.max(pdf)
    Pmin = np.min(pdf)

    #Global weighting
    gwpdf = Pmax * np.power(((pdf - Pmin) / (Pmax - Pmin)), np.cumsum(hist))

    gwcdf = np.cumsum(gwpdf)

    gamma = np.abs(1.0 - gwcdf[-1])

    #enhancing
    G = 255 * np.power((img / 255.0), gamma)

    # Calculating mean and sd of original and enhanced image
    mean_orig = np.mean(img)
    std_orig = np.std(img)

    mean_enhanced = np.mean(G)
    std_enhanced = np.std(G)

    #enhancement coefficient
    beta = 1.0 + np.sqrt(np.abs(std_orig - std_enhanced) / (2**B - 1))

    # Adjusting the pixel values using beta
    b = np.clip(beta * img + G, 0, 255).astype(np.uint8)

    return b


def contrast_enhancement(input_path, output_path):
    try:
        
        img = cv2.imread(input_path, cv2.IMREAD_GRAYSCALE)

        enhanced = main(img)
        cv2.imwrite(output_path, enhanced)

        print("Contrast Enhancement Image generated successfully:", output_path)
        
    except Exception as e:
        print("Error:", e)
