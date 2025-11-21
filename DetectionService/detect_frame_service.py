from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import numpy as np
import cv2
import uvicorn
import boto3
import uuid
import requests
from datetime import datetime
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO('yolov8s.pt')
print(f"[MODEL] Loaded: yolov8s.pt")
print(f"[MODEL] Classes: {model.names}")


s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION", "us-east-1")
)
S3_BUCKET = os.getenv("S3_BUCKET", "your-s3-bucket-name")
EXPRESS_URL = os.getenv("EXPRESS_URL", "http://localhost:3001/api/detection")

@app.post('/detect-frame/{userID}') 
async def detect_frame(userID: str, file: UploadFile = File(...)):
    image_bytes = await file.read()
    np_arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    if img is None:
        return JSONResponse({"error": "Invalid image"}, status_code=400)

    results = model(img)
    
    detections = []

    if results and results[0].boxes is not None:
        boxes = results[0].boxes.xyxy.cpu().numpy()
        confs = results[0].boxes.conf.cpu().numpy()
        clss = results[0].boxes.cls.cpu().numpy()
        names = results[0].names if hasattr(results[0], 'names') else model.names

        for i in range(len(boxes)):
            box = boxes[i].tolist()
            conf = float(confs[i])
            cls_id = int(clss[i])
            class_name = names[cls_id] if names and cls_id < len(names) else str(cls_id)

            x1, y1, x2, y2 = map(int, box)
            crop = img[y1:y2, x1:x2]
            if crop.size == 0:
                continue

            _, buffer = cv2.imencode('.jpg', crop)
            file_bytes = buffer.tobytes()
            s3_key = f"detections/{uuid.uuid4()}.jpg"

            try:
                s3_client.put_object(
                    Bucket=S3_BUCKET,
                    Key=s3_key,
                    Body=file_bytes,
                    ContentType='image/jpeg',
                    ACL='private'
                )
                s3_url = s3_client.generate_presigned_url(
                    'get_object',
                    Params={'Bucket': S3_BUCKET, 'Key': s3_key},
                    ExpiresIn=7 * 24 * 3600
                )

                payload = {
                    "class_name": class_name,
                    "confidence": round(conf, 4),
                    "s3_url": s3_url,
                    "s3_key": s3_key,
                    "timestamp": datetime.utcnow().isoformat(),
                    "userID": userID,
                }
                try:
                    requests.post(EXPRESS_URL, json=payload, timeout=5)
                except:
                    pass 

               
                detections.append({
                    "box": box,
                    "confidence": conf,
                    "class_id": cls_id,
                    "class_name": class_name,
                    "s3_url": s3_url
                })

            except Exception as e:
                print(f"S3 Upload Failed: {e}")
            

    return JSONResponse({"detections": detections})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)