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
RUN ["pip","install","-r","requirements.txt","-i","https://pypi.tuna.tsinghua.edu.cn/simple"]

# 拷贝代码
COPY . .

# 运行的命令
CMD ["gunicorn", "-c", "./gunicornConf.py","main:app"]
