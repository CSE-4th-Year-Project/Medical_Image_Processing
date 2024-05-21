import base64
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

from programs.weightedbilateral_gaussian import weighted_bilateral_filter
from programs.qhe_enhancement import qhe_contrast_enhancement
from programs.clahe_enhancement import clahe_contrast_enhancement
from programs.analysis import analysis
from programs.fuzzycmeans_segmentation import fcm_segmentation
from programs.classification import classification
from programs.image_segmentation import image_segmentation
from programs.gaussian_noise import gaussian_noise
from programs.salt_pepper_noise import salt_pepper_noise
from programs.same_image import same_image
from programs.contrast_enhancement import contrast_enhancement

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend Server Running"}

@app.post("/upload")
async def upload_image(image: UploadFile = File(...),mode: str = Form(...)):
    try:
        
        image_data = await image.read()

        input_image_path = "image_input.jpg"
        output_image_path = "image_output.jpg"
        
        additional_data = ""

        with open(input_image_path, "wb") as f:
            f.write(image_data)

        if(mode=="contrast"):
            contrast_enhancement(input_image_path, output_image_path)
        elif(mode=="contrast_qd"):
            qhe_contrast_enhancement(input_image_path, output_image_path)
        elif(mode=="contrast_gl"):
            clahe_contrast_enhancement(input_image_path, output_image_path)
            
        elif(mode=="saltpepper"):
            salt_pepper_noise(input_image_path, output_image_path)
        elif(mode=="saltpepper_fas"):
            salt_pepper_noise(input_image_path, output_image_path,1)
        elif(mode=="saltpepper_lpd"):
            salt_pepper_noise(input_image_path, output_image_path,4)
            
        elif(mode=="gaussian"):
            gaussian_noise(input_image_path, output_image_path)
        elif(mode=="gaussian_spt"):
            gaussian_noise(input_image_path, output_image_path)
        elif(mode=="gaussian_owbf"):
            weighted_bilateral_filter(input_image_path, output_image_path)
            
        elif(mode=="segment"):
            image_segmentation(input_image_path, output_image_path)
        elif(mode=="segment_rfcm"):
            image_segmentation(input_image_path, output_image_path,5) 
        elif(mode=="segment_fcmnls"):
            fcm_segmentation(input_image_path, output_image_path,5) 
            
        elif(mode=="classify"):
            model_path = "models\\cnn_model.keras"
            additional_data += classification(model_path,input_image_path, output_image_path)    
        elif(mode=="classify_effnet"):
            model_path = "models\\effnet_model.keras"
            additional_data += classification(model_path,input_image_path, output_image_path)
        elif(mode=="classify_mobnet"):
            model_path = "models\\mobnet_model.keras"
            additional_data += classification(model_path,input_image_path, output_image_path)
        elif(mode=="classify_xception"):
            model_path = "models\\xception_model.keras"
            additional_data += classification(model_path,input_image_path, output_image_path)
        elif(mode=="classify_inception"):
            model_path = "models\\inception_model.keras"
            additional_data += classification(model_path,input_image_path, output_image_path)
            
        elif(mode=="analysis"):
            additional_data += analysis(input_image_path, output_image_path)     
        else:
            same_image(input_image_path, output_image_path)
        
        # Encode the image file as base64
        with open(output_image_path, "rb") as f:
            image_data = base64.b64encode(f.read()).decode('utf-8')
        
        return JSONResponse(status_code=200, content={"image_data": image_data, "additional_data": additional_data})
    
    except Exception as e:
        # Return an error response if an exception occurs
        return JSONResponse(status_code=500, content={"error": str(e)})