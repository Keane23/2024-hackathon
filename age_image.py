from PIL import Image,ImageEnhance,ImageFilter
from random import randint
import numpy as np

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