from ultralytics import YOLO

model = YOLO("../model/train/runs/detect/train/weights/best.pt")
image_path=""
model(image_path)