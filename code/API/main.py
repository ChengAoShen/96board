import base64
import uuid
import numpy as np
import cv2
from flask import request,Flask,Response

from utils import cutting_photo
 
app=Flask(__name__)
 
# 定义路由
@app.route("/photo", methods=['POST'])
def post_photo():
    # 获取图片
    file = request.files['file']
    image = file.read()
    photo_name = file.filename

    # 在本地存储图片
    path = f"./cache/raw_photo/{photo_name}"
    npimg = np.frombuffer(image, np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    cv2.imwrite(path,image)

    # 使用yoloV8对于模型进行裁剪
    id_list = cutting_photo(path)
    # 返回裁剪后得到的图片URL
    return f"/photo/cutting/{id_list[0]}"


@app.route("/photo/raw/<imageId>")
def get_raw_photo(imageId):
    # 图片上传保存的路径
    with open(f'./cache/raw_photo/{imageId}.jpg', 'rb') as f:
        image = f.read()
        resp = Response(image, mimetype="image/jpg")
        return resp

@app.route("/photo/cutting/<imageId>")
def get_cutting_photo(imageId):
    # 图片上传保存的路径
    with open(f'./cache/cutting_photo/{imageId}.jpg', 'rb') as f:
        image = f.read()
        resp = Response(image, mimetype="image/jpg")
        return resp


# TODO:制定定时清理图片的任务

if __name__ == "__main__":
    app.run(debug=True)
