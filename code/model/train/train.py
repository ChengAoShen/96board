from ultralytics import YOLO

model = YOLO("yolov8s.pt")
results = model.train(data="./96-board.yaml", epochs=10)
