import numpy as np
from PIL import Image
from keras.models import load_model

def classification(model_path,input_path, output_path):
    try:
        
        with Image.open(input_path) as img_orig:

            img = img_orig
            
            img = img.resize((128, 128))
            img_array = np.array(img)
            img_array = img_array / 255.0
            img_array = np.expand_dims(img_array, axis=0)

            # Check if the number of color channels is not equal to 3
            if img_array.shape[-1] != 3:
                img_array = np.expand_dims(img_array, axis=-1)
                img_array = np.repeat(img_array, 3, axis=-1)
            
            model = load_model(model_path)
            
            
            predictions = model.predict(img_array)
            predicted_label = np.argmax(predictions[0])
            predicted_probability = predictions[0][predicted_label]
            
            tumor_types = ['no_tumor', 'glioma_tumor', 'meningioma_tumor', 'pituitary_tumor']
            label_name = tumor_types[predicted_label]
            # label_assigned = 'Tumor Present' if label_name != 'no_tumor' else 'Tumor Not Found'
                        
            print(f"Label {label_name} Probability {predicted_probability}")
            print("Image classified successfully.")
            
            img_orig.save(output_path)
            
            # Define the mapping
            label_mapping = {
                'no_tumor': 'No Tumor Present',
                'glioma_tumor': 'Image contains Glioma Tumor',
                'meningioma_tumor': 'Image contains Meningioma Tumor',
                'pituitary_tumor': 'Image contains Pituitary Tumor'
            }

            # Apply the mapping to label_name
            label_name_mapped = label_mapping.get(label_name, ' ')
            return label_name_mapped
            
    except Exception as e:
        print("Error:", e)
        return "Error occurred in Classification"
