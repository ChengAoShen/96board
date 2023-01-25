import requests
import json
 
url = "http://127.0.0.1:5000/photo"
# 图片地址
file_path='../../../data/Raw_data/IMG_20221207_164751.jpg'
# 图片名
file_name=file_path.split('/')[-1]
# 二进制打开图片
file=open(file_path,'rb')
# 拼接参数
files = {'file':(file_name,file)}

# 发送post请求到服务器端
r = requests.post(url,files = files)
print(r.text) 

url = f"http://127.0.0.1:5000/data/{r.text}"
data = {"num":[1,2,3,4]}
r = requests.post(url,json=data)
print(r.text)