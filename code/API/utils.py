import uuid
from typing import List

import cv2
from ultralytics import YOLO

# 加载模型文件
model = YOLO("../model/train/runs/detect/train/weights/best.pt")

# 定义常量
alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"]
alphabet_num = {"A": 1, "B": 2, "C": 3, "D": 4, "E": 5, "F": 6, "G": 7, "H": 8}

#########################################通用工具#########################################


def char_to_num(id: str) -> int:
    """将ID转化为数字"""
    row = alphabet_num[id[0]]
    column = int(id[1:])
    return (row-1)*12+column


def num_to_char(num: int) -> str:
    """将数字转化为ID"""
    row = (num-1)//12+1
    column = (num-1) % 12+1
    return alphabet[row-1]+str(column)

def get_location(shape,id):
    """给定孔板的形状和孔的ID返回孔的位置"""
    row_block:int = shape[1]//12
    column_block:int = shape[0]//8

    location_row = row_block*((id-1)%12)+row_block//2
    location_column = column_block*((id-1) // 12)+column_block//2
    #! 需要注意的是此处返回的是自然坐标下的行列,
    #! 但由于opencv的坐标系和我们的坐标系不同，
    #! 所以在提取颜色的时候需要行列反用
    return location_row,location_column 
#########################################图片处理工具#########################################


def cutting_photo(path) -> List:
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

def get_data(path,id_list: list) -> dict:
    """
    输入板的ID和需要的孔编号返回RGBHSV数据
    """
    ans = dict()
    img = cv2.imread(path)
    B, G, R = cv2.split(img)
    HSV = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    H, S, V = cv2.split(HSV)
    data = [R, G, B, H, S, V] #获得在全位置的RGBHSV数据
    shape = B.shape

    for id in id_list:
        ans[str(id)] = []
        for color in data:
            # 提取每一个区域中心点数据
            location_row, location_column = get_location(shape, id)
            ans[str(id)].append(int(color[location_column][location_row]))
    return ans


def draw_photo(path):
    """绘制所有的圈位置，用于展示"""
    img = cv2.imread(path)
    B, _, _ = cv2.split(img)

    shape = B.shape
    for id in range(1,97):
        cv2.circle(img, get_location(shape,id), 30, (0,255,0), 0)
    cv2.imshow("img", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


def quick_judge(path,tol:int)->List[str]:
    """
    快速判断和标准样本是否有差异
    每一块孔板最左边一列为标准样品，给定这一列从而满足误差的兼容
    之后对比从第二列开始的每一个孔，探索其中是否存在不在标准列区间内部的孔
    返回这些孔的ID
    """
    img = cv2.imread(path)

    B, G, R = cv2.split(img)
    HSV = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    H, S, V = cv2.split(HSV)
    data = [R, G, B] #获得在全位置的RGBHSV数据
    shape = B.shape

    # 计算标准范围
    data = get_data(path,[1,13,25,37,49,61,73,85])
    # 获得标准RGB范围
    R_min = min(data["1"][0],data["13"][0],data["25"][0],data["37"][0],data["49"][0],data["61"][0],data["73"][0],data["85"][0])-tol
    R_max = max(data["1"][0],data["13"][0],data["25"][0],data["37"][0],data["49"][0],data["61"][0],data["73"][0],data["85"][0])+tol

    G_min = min(data["1"][1],data["13"][1],data["25"][1],data["37"][1],data["49"][1],data["61"][1],data["73"][1],data["85"][1])-tol
    G_max = max(data["1"][1],data["13"][1],data["25"][1],data["37"][1],data["49"][1],data["61"][1],data["73"][1],data["85"][1])+tol

    B_min = min(data["1"][2],data["13"][2],data["25"][2],data["37"][2],data["49"][2],data["61"][2],data["73"][2],data["85"][2])-tol
    B_max = max(data["1"][2],data["13"][2],data["25"][2],data["37"][2],data["49"][2],data["61"][2],data["73"][2],data["85"][2])+tol
    
    ans = []
    # 开始对比
    for i in range(8):
        for j in range(2,13):
            num = i*12+j
            location_row, location_column = get_location(shape, num)
            if R[location_column][location_row]<R_min or R[location_column][location_row]>R_max:
                ans.append(num_to_char(num))
                continue
            if G[location_column][location_row]<G_min or G[location_column][location_row]>G_max:
                ans.append(num_to_char(num))
                continue
            if B[location_column][location_row]<B_min or B[location_column][location_row]>B_max:
                ans.append(num_to_char(num))
                continue
    return ans
