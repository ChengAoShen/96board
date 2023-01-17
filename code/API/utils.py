import uuid
import cv2
from ultralytics import YOLO

model = YOLO("../model/train/runs/detect/train/weights/best.pt")


def cutting_photo(path):

    """
    根据锚框裁剪图片并存入cache中并返回寻找到的ID列表
    """
    img = cv2.imread(path)
    outputs = model(path,return_outputs=True)

    ID_list = [] #! 现阶段是只有一块板子，这样设计是为了之后变成更多的板子之后可以使用
    for output in outputs:
        for box in output["det"]:
            # 给图片加载UUID
            currentID = uuid.uuid1()
            ID_list.append(currentID)

            # 裁剪并保存图片
            crop_img = img[int(box[1]):int(box[3]),int(box[0]):int(box[2])]
            cv2.imwrite(f"./cache/cutting_photo/{currentID}.jpg",crop_img)

    return ID_list


def get_data(image_id,num):
    """输入板的ID和需要的孔编号返回RGBHSV数据 """
    ...

