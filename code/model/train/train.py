from ultralytics import YOLO

model = YOLO("yolov8s.pt")
model.to("mps")
results = model.train(data="./96-board.yaml", epochs=10)