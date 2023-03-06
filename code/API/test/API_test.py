import requests
import json
 
url = "http://127.0.0.1:5000/photo"
# 图片地址
file_path='./test.JPG'
# 图片名
file_name=file_path.split('/')[-1]
# 二进制打开图片
file=open(file_path,'rb')
# 拼接参数
files = {'file':(file_name,file)}

# 发送post请求到服务器端
r = requests.post(url,files = files)
print(r.text) 

# url = f"http://127.0.0.1:5000/data/cea6c002-a0b0-11ed-b44a-3effe0df1b5c"
# data = {"num":[14,15]}
# r = requests.post(url,json=data)
# print(r.text)

# data = {"num":[13]}
# r = requests.post(url,json=data)
# print(r.text)
