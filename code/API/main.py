import base64
import uuid
import numpy as np
import cv2
from flask import request,Flask,Response

from predict import predict
 
app=Flask(__name__)
 
# 定义路由
#!!!! 此处的代码需要修改!!!!
# TODO:此处使用的是旧版本的API，需要进行更新
@app.route("/photo", methods=['POST'])
def get_frame():
    # 获取图片
    file = request.files['file']
    image = file.read()
    photo_name = file.filename

    # 获取参数
    parameter=request.form['parameter']
    npimg = np.frombuffer(image, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    circles=deal_photo(img,photo_name)
    return '/photo/'+photo_name

@app.route("/photo/<imageId>")
def get_photo(imageId):
    # 图片上传保存的路径
    with open(f'./cache/{imageId}', 'rb') as f:
        image = f.read()
        resp = Response(image, mimetype="image/png")
        return resp


if __name__ == "__main__":
    app.run(debug=True)
