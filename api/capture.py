from torchvision import models
from PIL import Image
import matplotlib.pyplot as plt
import torch
import numpy as np
import cv2
import base64
import torchvision.transforms as T

def decode_segmap(image, source, nc=21):

  label_colors = np.array([(0, 0, 0),  # 0=background
               # 1=aeroplane, 2=bicycle, 3=bird, 4=boat, 5=bottle
               (128, 0, 0), (0, 128, 0), (128, 128, 0), (0, 0, 128), (128, 0, 128),
               # 6=bus, 7=car, 8=cat, 9=chair, 10=cow
               (0, 128, 128), (128, 128, 128), (64, 0, 0), (192, 0, 0), (64, 128, 0),
               # 11=dining table, 12=dog, 13=horse, 14=motorbike, 15=person
               (192, 128, 0), (64, 0, 128), (192, 0, 128), (64, 128, 128), (192, 128, 128),
               # 16=potted plant, 17=sheep, 18=sofa, 19=train, 20=tv/monitor
               (0, 64, 0), (128, 64, 0), (0, 192, 0), (128, 192, 0), (0, 64, 128)])

  r = np.zeros_like(image).astype(np.uint8)
  g = np.zeros_like(image).astype(np.uint8)
  b = np.zeros_like(image).astype(np.uint8)

  for l in range(0, nc):
    idx = image == l
    r[idx] = label_colors[l, 0]
    g[idx] = label_colors[l, 1]
    b[idx] = label_colors[l, 2]

  rgb = np.stack([r, g, b], axis=2)
  foreground = cv2.imread(source)

  foreground = cv2.resize(foreground,(r.shape[1],r.shape[0]))
  rgba = cv2.cvtColor (foreground, cv2.COLOR_RGB2RGBA)
  foreground = cv2.cvtColor(foreground, cv2.COLOR_BGR2RGB)

  background = 255 * np.ones_like(rgb).astype(np.uint8)

  foreground = foreground.astype(float)
  background = background.astype(float)

  th, alpha = cv2.threshold(np.array(rgb),0,255, cv2.THRESH_BINARY)

  alpha = cv2.GaussianBlur(alpha, (7,7),0)
  alpha2 = cv2.cvtColor(alpha, cv2.COLOR_BGR2GRAY)
  alpha = alpha.astype(float)/255

  contours, hierarchy = cv2.findContours (alpha2, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE )
  mask = np.zeros_like (alpha2)
  for cnt in contours:
    cv2.drawContours (mask, contours, -1, color = 255, thickness = -1)
  rgba [..., 3] = mask
  return rgba

#def segment(net, path, show_orig=True, dev='cuda'):
def segment(net, path, show_orig=True, dev='cpu'):
  img = Image.open(path)
  if show_orig: plt.imshow(img); plt.axis('off'); plt.show()
  trf = T.Compose([T.Resize(450),
                   T.ToTensor(),
                   T.Normalize(mean = [0.485, 0.456, 0.406],
                               std = [0.229, 0.224, 0.225])])
  inp = trf(img).unsqueeze(0).to(dev)
  out = net.to(dev)(inp)['out']
  om = torch.argmax(out.squeeze(), dim=0).detach().cpu().numpy()

  rgba2 = decode_segmap(om, path)
  cv2.imwrite("/tmp/insert.png",rgba2)


result = {
       "result":  "ok"
   }

def post(data):
   """
       Author : Alessandro de Oliveira Faria (A.K.A. CABELO)
   """
   _data = data.get("data",None)
   decoded = base64.b64decode( _data )
   print("            - - ","processando")
   with open("/tmp/download.jpg","wb") as image_file:
     image_file.write(decoded)
   dlab = models.segmentation.deeplabv3_resnet101(pretrained=1).eval()
   segment(dlab, '/tmp/download.jpg', show_orig=False)
   print("            - - ","processado")
   return result
