from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import numpy as np
import cv2
import uvicorn
import shutil
import os

app = FastAPI()

# Allow CORS for local development (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the YOLOv8 model
model = YOLO('yolov8s.pt')

@app.post('/detect-frame')
async def detect_frame(file: UploadFile = File(...)):
    # Read image bytes
    image_bytes = await file.read()
    np_arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    if img is None:
        return JSONResponse({"error": "Invalid image"}, status_code=400)


    # Run detection
    results = model(img)
    detections = []
    if results and results[0].boxes is not None:
        boxes = results[0].boxes.xyxy.cpu().numpy()  # [x1, y1, x2, y2]
        confs = results[0].boxes.conf.cpu().numpy()  # confidence
        clss = results[0].boxes.cls.cpu().numpy()    # class ids
        names = results[0].names if hasattr(results[0], 'names') else model.names
        for i in range(len(boxes)):
            box = boxes[i].tolist()
            conf = float(confs[i])
            cls_id = int(clss[i])
            class_name = names[cls_id] if names and cls_id < len(names) else str(cls_id)
            detections.append({
                "box": box,
                "confidence": conf,
                "class_id": cls_id,
                "class_name": class_name
            })

    return JSONResponse({"detections": detections})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
