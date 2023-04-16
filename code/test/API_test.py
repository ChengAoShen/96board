import requests
import json
 
# ---------上传图片测试---------
url = "https://hole.sicau.edu.cn/photo"
# 图片地址
file_path='./test1.jpg'
# 图片名
file_name=file_path.split('/')[-1]
# 二进制打开图片
file=open(file_path,'rb')
# 拼接参数
files = {'file':(file_name,file)}
#发送post请求到服务器端
r = requests.post(url,files = files)
print(r.text) 



# ---------快速检测测试---------
# url = f"http://127.0.0.1:5000/quick_detection/ed390228-c216-11ed-8b8b-3effe0df1b5c"
# r = requests.request("GET", url)
# print(r.text)

# ---------颜色提取测试---------
# url = f"http://127.0.0.1:5000/data/test1"
# data = {"num":[14,15]}
# r = requests.post(url,json=data)
# print(r.text)



# --------分析测试---------
# url = f"http://127.0.0.1:5001/analyse/25e731a8-c654-11ed-afef-3effe0df1b5c"
# data = {"num":[13,14,15,16,17,18,19,20],"mode":1}
# r = requests.post(url,json=data)
# print(r.text)

