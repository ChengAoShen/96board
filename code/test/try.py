## 用来进行梯形矫正的代码

import cv2
import os
import numpy as np
from tqdm import tqdm
src_DIR ="test2.jpg"
img = cv2.imread(src_DIR)
img_transform = img.copy()
arr = []
def on_EVENT_LBUTTONDOWN(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        arr.append([x, y])
        cv2.circle(img, (x, y), 5, (255, 0, 255), thickness=-1)
        cv2.imshow("manual", img)

cv2.namedWindow("manual", cv2.WINDOW_FREERATIO)
cv2.setMouseCallback("manual", on_EVENT_LBUTTONDOWN)
cv2.imshow("manual", img)
if cv2.waitKey(0) == 27:
    cv2.destroyAllWindows()

P1, P2, P3, P4 = arr[:]

print("选定的四个角点为：{}{}{}{}".format(P1, P2, P3, P4))
cv2.circle(img_transform, tuple(P1), 2, (255, 0, 0), 3)
cv2.circle(img_transform, tuple(P2), 2, (255, 0, 0), 3)
cv2.circle(img_transform, tuple(P3), 2, (255, 0, 0), 3)
cv2.circle(img_transform, tuple(P4), 2, (255, 0, 0), 3)
# # 输入梯形的四个顶点
srcPoints = np.vstack((P1, P2, P3, P4))
srcPoints = np.float32(srcPoints)
# 目标的像素值大小
long = 297# 图片的长宽
short = 210
# 设置目标画布的大小
canvasPoints = np.array([[0, 0], [int(long), 0], [0, int(short)], [int(long), int(short)]])
canvasPoints = np.float32(canvasPoints)
# 计算转换矩阵
perspectiveMatrix = cv2.getPerspectiveTransform(srcPoints, canvasPoints)
# 完成透视变换
perspectiveImg = cv2.warpPerspective(img_transform, perspectiveMatrix, (int(long), int(short)))
print("开始校正")
cv2.imshow("perspectiveImg", perspectiveImg)
cv2.waitKey(0)
cv2.destroyAllWindows()
