import os.path
import os
import ujson
import json
import requests
import base64
import sys

print (sys.argv[1])
with open(sys.argv[1], "rb") as image_file:
    img = base64.b64encode(image_file.read())
headers = { 'Accept' : 'application/json', 'Content-Type' : 'application/json' }
payload = { 'data' : img }
response = requests.post('http://192.168.0.4:8080/image', headers=headers, json=payload )
print(response.text)

