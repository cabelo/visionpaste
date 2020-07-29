from connexion.resolver import RestyResolver
from flask_cors import CORS, cross_origin
from flask import render_template
import connexion
#import api.certiface

def set_cors_headers_on_response(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    #response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With'
    response.headers['Access-Control-Allow-Headers'] = 'X-PINGOTHER, Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE, PUT'
    response.headers['server'] = 'Modoki/0.15.5'
    return response

#app = connexion.App(__name__, port=8080, specification_dir='./')
app = connexion.App(__name__, specification_dir='./')

app.add_api('static/swagger.yaml', resolver=RestyResolver('api'))
app.app.after_request(set_cors_headers_on_response)

@app.route('/')
def capture():
    return render_template('camera/capture.html') 
#    return render_template('index.html', my_string="Wheeeee!", my_list=[0,1,2,3,4,5])

@app.route('/swagger/')
def home():
    return render_template('swagger/home.html') 
#    return render_template('index.html', my_string="Wheeeee!", my_list=[0,1,2,3,4,5])

if __name__ == '__main__':
   app.run(host='192.168.0.4', port=8080, debug=True, ssl_context=('cert.pem', 'key.pem'))
#   app.run(host='0.0.0.0', port=8080, debug=True)
#    app.run(host='192.168.0.3', port=8080, debug=True,ssl_context='adhoc')
