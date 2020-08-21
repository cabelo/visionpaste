#!/usr/bin/python
 
from gimpfu import *
import time
import os
import os.path
import gtk

def ai_plugin_main(timg, tdrawable):
  print( "Vison Paste")
  message = gtk.MessageDialog(type=gtk.MESSAGE_INFO, buttons=gtk.BUTTONS_CLOSE)
  image = gtk.Image()
  image.set_from_file('/dados/home/cabelo/.gimp-2.8/plug-ins/aipaste.jpg')
  message.set_image(image)
  message.set_markup("Take a picture \nof qrcode and\n click Ok.")
  message.set_resizable(1)
  message.show_all()
  message.run()
  message.destroy()
  
  pdb.gimp_message("AI Segmentation Semantic")
  t = 0
  while t<30:
    if os.path.exists("/tmp/insert.png"):
      image = gimp.image_list()[0]
      new_layer = pdb.gimp_file_load_layer(image, "/tmp/insert.png")
      os.remove("/tmp/insert.png")
      pdb.gimp_image_insert_layer(image, new_layer, None, 0)
      print("Object pasted")
      break;
    print("Skip... ")
    time.sleep(2.4)
    t += 1
  print("Time Out... ")


register(
    "python_fu_ai",
    "AI for filter with computer vision",
    "AI for filter with computer vision",
    "Alessandro de Oliviera Faria",
    "Alessandro de Oliveira Faria",
    "2010",
    "<Image>/Image/AI Plugin",
    "RGB*, GRAY*",
    [],
    [],
    ai_plugin_main)

main()
