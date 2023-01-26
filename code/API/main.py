import base64
import uuid
import numpy as np
import cv2
from flask import request, Flask, Response, jsonify

from utils import cutting_photo, get_data

app = Flask(__name__)

# 图片上传接口
@app.route("/photo", methods=['POST'])
def post_photo():
    file = request.files['file']
    image = file.read()
    photo_name = file.filename

    # 在本地存储图片
    path = f"./cache/raw_photo/{photo_name}"
    npimg = np.frombuffer(image, np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    cv2.imwrite(path, image)

    # 使用yoloV8对于模型进行裁剪
    id_list = cutting_photo(path)
    # 返回裁剪后得到的图片URL
    return f"{id_list[0]}"


# 返回裁剪后图片
@app.route("/photo/cutting/<imageId>")
def get_cutting_photo(imageId):
    # 图片上传保存的路径
    with open(f'./cache/cutting_photo/{imageId}.jpg', 'rb') as f:
        image = f.read()
        resp = Response(image, mimetype="image/jpg")
        return resp


# 获取荧光数据接口
@app.route("/data/<imageId>", methods=['POST'])
def get_RGB(imageId):
    data = request.json["num"]

    ans = get_data(imageId,data)
    print(ans)
    print(type(ans))
    return jsonify(ans)


# 静态图片返回接口
@app.route("/static/image/<fileName>")
def get_static_image(fileName):
    with open(f'./static/image/{fileName}', 'rb') as f:
        image = f.read()
        resp = Response(image, mimetype="image/jpg")
        return resp


# TODO:制定定时清理图片的任务


if __name__ == "__main__":
    app.run(debug=True)
