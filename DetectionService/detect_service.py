from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import uvicorn
import shutil
import os

app = FastAPI()

# Load the YOLOv8 model
model = YOLO('yolov8s.pt')

@app.post('/detect')
async def detect_weapon(file: UploadFile = File(...)):
    # Save uploaded file temporarily
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Run detection
    results = model(temp_file)
    detections = results[0].boxes.data.tolist() if results and results[0].boxes is not None else []
    
    # Remove temp file
    os.remove(temp_file)
    
    return JSONResponse({"detections": detections})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
