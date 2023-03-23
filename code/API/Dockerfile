FROM ubuntu

LABEL name = "shenvinci"
WORKDIR /API
ENV TZ=Asia/Shanghai
# 禁止安装时的交互功能
ENV DEBIAN_FRONTEND=noninteractive

RUN ["sed","-i","s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g","/etc/apt/sources.list"]
RUN ["apt-get","clean"]
RUN ["apt-get","update"]
RUN ["apt-get","install","-y","nginx"]
RUN ["apt-get","install","-y","python3"]
RUN ["apt","install","-y","python3-pip"]

COPY requirements.txt ./
RUN ["pip","install","opencv-python-headless","-i","https://mirrors.aliyun.com/pypi/simple"]
RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
RUN ["pip","install","-r","requirements.txt","-i","https://mirrors.aliyun.com/pypi/simple"]
RUN ["apt" ,"install" ,"-y" ,"libgl1-mesa-glx"]
RUN ["apt-get","install", "-y"," libglib2.0-dev"]

# 拷贝代码
COPY . .

# 运行的命令
#nohup gunicorn -c gunicornConf.py main:app &
#nginx -c /API/nginx.conf