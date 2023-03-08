import gradio as gr
import numpy as np

from utils import quick_judge,draw_photo,cutting_photo


def local_detect(input):
    cutted_img = cutting_photo(input)
    return quick_judge(cutted_img),draw_photo(cutted_img)

def local(input):
    return cutting_photo()(input)

def detect(input):
    return quick_judge(input),draw_photo(input)

    
with gr.Blocks() as demo:
    with gr.Tab("孔板定位+快速检测"):
        gr.Markdown("## 孔板定位+快速检测\n这一窗口可以同时进行孔板定位和快速检测\n")
        with gr.Row():
            with gr.Column():
                input = gr.Image(shape=None, label="孔板图片")
                button = gr.Button("GO!", elem_id="predict_button")

            with gr.Column():
                output = [gr.Textbox("Output", label="发生变色的孔位编号"),
                        gr.Image(shape=None, image_mode='RGB', label="孔定位图")]
    button.click(local_detect,inputs=input,outputs=output)


    with gr.Tab("孔板定位"):
        gr.Markdown("## 孔板定位\n这一窗口可以使用深度学习模型将孔板从图像中进行提取\n")
        with gr.Row():
            with gr.Column():
                local_input = gr.Image(shape=None, label="孔板图片")
                local_button = gr.Button("Predict", elem_id="predict_button")

            local_output = gr.Image(shape=None, image_mode='RGB', label="裁剪后的孔板图片")

    local_button.click(local,inputs=local_input,outputs=local_output)

    with gr.Tab("快速检测"):
        gr.Markdown("## 快速检测\n用来快速检测出发生变色的孔位(需要自行进行裁剪)\n")
        with gr.Row():
            with gr.Column():
                detect_input = gr.Image(shape=None, image_mode='RGB', label="孔板图片")
                detect_button = gr.Button("Detect")
            with gr.Column():
                detect_output = [gr.Textbox("Output", label="发生变色的孔位编号"),
                        gr.Image(shape=None, image_mode='RGB', label="孔定位图")]
    detect_button.click(detect,inputs=detect_input,outputs=detect_output)


demo.launch()
