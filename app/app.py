import time
from flask import Flask,request
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder='../app/build', static_url_path='/')
bcrypt = Bcrypt()

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')

# @app.route('/app/time')
# def get_current_time():
#     return {'time':time.time()}

@app.route('/app/create', methods=['POST'])
def create():
    print("THIS IS A TEST",flush=True)
    data = request.get_json(force=True)
    username = data.get('username', None)
    email = data.get('email', None)
    hashpass = bcrypt.generate_password_hash(data.get('password', None))
    print(hashpass)
    print(data)
    return app.send_static_file('index.html')