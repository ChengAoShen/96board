from ultralytics import YOLO

model = YOLO("../model/train/runs/detect/train/weights/best.pt")

def predict(path):
    return model(path)