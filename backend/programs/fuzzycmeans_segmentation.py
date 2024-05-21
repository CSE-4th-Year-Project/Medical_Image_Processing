import cv2
import numpy as np

def initialize_membership_matrix(n_samples, n_clusters):
    U = np.random.dirichlet(np.ones(n_clusters), size=n_samples)
    return U

def calculate_cluster_centers(U, X, m):
    um = U ** m
    centers = (um.T @ X) / np.sum(um.T, axis=1, keepdims=True)
    return centers

def update_membership_matrix(U, centers, X, m):
    p = 2 / (m - 1)
    dist = np.linalg.norm(X[:, np.newaxis] - centers, axis=2)
    temp = dist ** p
    denominator = np.sum((1 / temp), axis=1, keepdims=True)
    U = (1 / temp) / denominator
    return U

def calculate_objective_function(U, centers, X, m):
    um = U ** m
    dist = np.linalg.norm(X[:, np.newaxis] - centers, axis=2) ** 2
    obj = np.sum(um * dist)
    return obj

def fuzzy_c_means(X, n_clusters=4, m=2, max_iter=100, error=1e-5):
    n_samples, _ = X.shape
    U = initialize_membership_matrix(n_samples, n_clusters)
    for _ in range(max_iter):
        U_old = U.copy()
        centers = calculate_cluster_centers(U, X, m)
        U = update_membership_matrix(U, centers, X, m)
        if np.linalg.norm(U - U_old) < error:
            break
    return centers, U

def fcm_segmentation(input_image_path, output_image_path, n_clusters=4):
    try:
        image = cv2.imread(input_image_path)
        pixels = image.reshape((-1, 3))
        pixels = np.float32(pixels)

        centers, U = fuzzy_c_means(pixels, n_clusters)
        labels = np.argmax(U, axis=1)
        segmented_image = centers[labels].reshape(image.shape).astype(np.uint8)

        cv2.imwrite(output_image_path, segmented_image)
        print("Image segmented and saved as", output_image_path)

    except Exception as e:
        print("Error:", e)
