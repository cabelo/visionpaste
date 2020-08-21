# visionpaste

***VisionPaste*** is a Project created to to process the image and to cut the object with semantic segmentation. The system uses a micro-service to allow sending the live image with a cell phone. The micro service is accessed through a qr-code.

Is an artificial intelligence plug-in for computer graphics software GIMP. The project uses the semantic segmentation feature of computer vision with deep learning to capture the photo from the cell phone, send it to the AI core to cut the scene object and automatically send it to the image editor.

## Installation instructions:

***Under construction***

Below, a quick description of how to manually install the VisionPaste project.

### Clone the project

Clone the repository at desired location:

``` bash
$ git clone https://github.com/cabelo/visionpaste
$ cd visionpaste
$ python3 server.py 
 * Serving Flask app "server" (lazy loading)
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on https://192.168.0.4:8080/ (Press CTRL+C to quit)


```
### To Do

- [x] Push first commit to GitHub
- [ ] Start automatic web server
- [ ] Create install script
- [ ] Generate dinamic qrcode
- [ ] Select algorithm of semantic segmantation
- [ ] Create package .rpm and .deb
- [ ] Create documantation 
- [ ] Create script for certificate generation
- [ ] Create HTML page
- [ ] Add background effects

### The final result

Bellow an example running in my machine with OpenSUSE Leap.

contact : Alessandro de Oliveira Faria (A.K.A.CABELO) cabelo@opensuse.org

![](img/example.gif)
