import uuid
import cv2
from ultralytics import YOLO

model = YOLO("../model/train/runs/detect/train/weights/best.pt")


def cutting_photo(path):
    """
    根据锚框裁剪图片并存入cache中并返回寻找到的ID列表
    """
    img = cv2.imread(path)
    outputs = model(path)

    ID_list = []  # ! 现阶段是只有一块板子，这样设计是为了之后变成更多的板子之后可以使用
    for output in outputs:
        boxes = output.boxes.boxes
        for box in boxes:
            # 给图片加载UUID
            currentID = uuid.uuid1()
            ID_list.append(currentID)

            # 裁剪并保存图片
            crop_img = img[int(box[1]):int(box[3]), int(box[0]):int(box[2])]
            cv2.imwrite(f"./cache/cutting_photo/{currentID}.jpg", crop_img)

    return ID_list


def get_data(imageId: str, id_list: list) -> dict:
    """输入板的ID和需要的孔编号返回RGBHSV数据 """
    ans = dict()
    img = cv2.imread(f"./cache/cutting_photo/{imageId}.jpg")
    B, G, R = cv2.split(img)
    HSV = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    H, S, V = cv2.split(HSV)
    data = [R, G, B, H, S, V] #获得在全位置的RGBHSV数据
    shape = B.shape

    row_block:int = shape[1]//12
    column_block:int = shape[0]//8

    for id in id_list:
        ans[str(id)] = []

        # 计算孔位位置
        location_row = row_block*((id-1)%12)+row_block//2
        location_column = column_block*((id-1) // 12)+column_block//2

        for color in data:
            # 提取每一个颜色的数据  
            ans[str(id)].append(int(color[location_row][location_column]))
    return ans
