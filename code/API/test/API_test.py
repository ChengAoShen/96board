import requests
import base64
 
# API地址
url = "http://127.0.0.1:5000/photo"
# 图片地址
file_path='../../data/IMG_20221207_172228.jpg'
# 图片名
file_name=file_path.split('/')[-1]
# 二进制打开图片
file=open(file_path,'rb')
# 拼接参数
files = {'file':(file_name,file)}
data={'parameter':'test'}

# 发送post请求到服务器端
r = requests.post(url,files = files,data=data)
print(r.text)
