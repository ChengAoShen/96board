FROM ubuntu

LABEL name = "shenvinci"
WORKDIR /Project
ENV TZ=Asia/Shanghai
# 禁止安装时的交互功能
ENV DEBIAN_FRONTEND=noninteractive

RUN ["sed","-i","s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g","/etc/apt/sources.list"]
RUN ["apt-get","clean"]
RUN ["apt-get","update"]
RUN ["apt-get","install","-y","python3"]
RUN ["apt","install","-y","python3-pip"]

COPY requirements.txt ./
RUN ["pip","install","-r","requirements.txt","-i","https://pypi.tuna.tsinghua.edu.cn/simple"]

COPY ./code/web_ui /Project/web_ui

# 运行的命令
RUN ["cd","web_ui"]
CMD ["python" ,"main.py"]
