import numpy as np
import cv2

def get_circle(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.medianBlur(gray, 5)
    circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, 1, 50,param2=50, minRadius=0, maxRadius=500)
    return circles

def draw_photo(img,circles):
    if circles is not None:
        circles = np.uint16(np.around(circles))
        for i in circles[0, :]:
            cv2.circle(img, (i[0], i[1]), i[2], (255, 255, 255), 2)
            cv2.circle(img, (i[0], i[1]), 2, (255, 255, 255), 3)
    return img

def save_image(img,id):
    # 保存图片
    cv2.imwrite(f"./cache/{id}", img)

def deal_photo(img,id):
    # 找到图片中的所有圆形
    circles=get_circle(img)
    # 画出圆形
    img=draw_photo(img,circles)
    # 保存图片
    save_image(img,id)


if __name__ == "__main__":
    # 找到图片中的所有圆形
    img = cv2.imread("../../data/IMG_20221207_164651.jpg")
    circles=get_circle(img)
    # 画出圆形
    img=draw_photo(img,circles)
    # 保存图片
    save_image(img,1)
