from PIL import Image,ImageEnhance,ImageFilter
from random import randint
import numpy as np
import sys
from io import BytesIO
import base64
from flask import Flask,request,jsonify
from flask_cors import CORS
import time
import journalist

app = Flask(__name__)
CORS(app)

def applypaper(original):
    paperimg = Image.open(f"paper{randint(1,5)}.png")
    paperimg=paperimg.resize(original.size)
    returnimg = Image.blend(original,paperimg,0.35)
    # returnimg.show()
    return returnimg

def applystrongersepia(image):
    w, h = image.size
    pixels = image.load()
    for i in range(h):
        for j in range(w):
            r, g, b = image.getpixel((j,i))
            newr = min(255,int(int(0.393 * r + 0.769 * g + 0.189 * b)*0.75))
            newg = min(255,int(int(0.349 * r + 0.686 * g + 0.168 * b)*0.75))
            newb = min(255,int(int(0.272 * r + 0.534 * g + 0.131 * b)*0.75))
            pixels[j,i] = (newr, newg, newb)
    #image.show()
    return image

def addnoise(image):
    npimage = np.array(image)
    noise = np.random.randint(0,5,npimage.shape,dtype=np.uint8)
    npimage+=noise
    npimage = np.clip(npimage,0,255)
    img =  Image.fromarray(npimage.astype(np.uint8))
    # img.show()
    return img

def addvignette(image):
    w,h = image.size
    centre = (w//2,h//2)
    max_dist = np.sqrt(centre[0]**2 + centre[1]**2)

    for i in range(w):
        for j in range(h):
            dist = np.sqrt((i - centre[0])**2 + (j - centre[1])**2)
            factor = 1 - (dist / max_dist) * 0.6 
            r, g, b = image.getpixel((i, j))
            r = int(r * factor)
            g = int(g * factor)
            b = int(b * factor)
            image.putpixel((i,j),(r, g, b))
    return image

def age_image(input_image_path,output_image_path):
    image = Image.open(input_image_path).convert("RGB")
    image = applystrongersepia(image)
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(1.8)
    image = addvignette(image)
    image = addnoise(image)
    image = image.filter(ImageFilter.GaussianBlur(1.1))
    image.save(output_image_path)
    
@app.route('/generate',methods=["POST"])
def age_image_flask():
    start = time.time()
    data = request.get_json()
    print(data)
    point1 = time.time()
    print(f"{point1-start} to get json")
    try:
        inputb64 = data['image'].split(",")[1]
    except:
        inputb64 = data
    point2 = time.time()
    print(f"{point2-point1} to split")
    image = Image.open(BytesIO(base64.b64decode(inputb64))).convert("RGB")
    point3 = time.time()
    print(f"{point3-point2} to convert to image")
    image = applystrongersepia(image)
    point4 = time.time()
    print(f"{point4-point3} to sepia")
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(1.8)
    point5 = time.time()
    print(f"{point5-point4} to contrast")
    image = addvignette(image)
    point6 = time.time()
    print(f"{point6-point5} to vignette")
    image = addnoise(image)
    point7 = time.time()
    print(f"{point7-point6} to noise")
    image = image.filter(ImageFilter.GaussianBlur(1.1))
    point8 = time.time()
    print(f"{point8-point7} to blur")
    # image.save(output_image_path)
    # image.show()
    buffered = BytesIO()
    image.save(buffered,format="PNG")
    toreturn = base64.b64encode(buffered.getvalue()).decode('utf-8')
    point9 = time.time()
    print(f"{point9-point8} to convert to image")
    print("returning")
    point10 = time.time()
    article = journalist.generate_article(inputb64)
    print(article['title'])
    x =jsonify({'generatedImage': toreturn,'jsonData':article})
    point11 = time.time()
    print(f"{point11-point10} to convert to journalist")
    print(f"{point11-start} to finish")
    return x


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)