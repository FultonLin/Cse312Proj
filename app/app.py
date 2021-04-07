import time
from flask import Flask,request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
import jwt



app = Flask(__name__, static_folder='../app/build', static_url_path='/')
bcrypt = Bcrypt()
mongoClient = MongoClient("db", 27017) 
database = mongoClient["database"]
users = database["users"]
secret = "supersecretstring"
login_number = 0

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/app/create', methods=['POST'])
def create():
    print("THIS IS A TEST",flush=True)
    data = request.get_json(force=True)
    username = data.get('username', None)
    email = data.get('email', None)
    password = data.get('password', None)

    if username == "" or email == "" or password == "":
        msg = {"msg": "Credential left blank"}
        return jsonify(msg),400
    else:
        hashpass = bcrypt.generate_password_hash(password)  #Password is hashed

        # Check if this username or email already exists in database
        if(database.users.find({"username": username}).count() > 0 or database.users.find({"email": email}).count() > 0):
            msg = {"msg": "Username/Email taken"}
            return jsonify(msg),400
        # If account not taken, make account and generate authentication token
        else: 
            dataVal = {"username": username, "email": email, "hashedPassword": hashpass}
            x = users.insert_one(dataVal)
            increment_login_number()
            encoded = jwt.encode({'alg': "HS256", 'typ': "JWT", 'sub': username, 'num': str(login_number)}, secret, algorithm="HS256")
            msg = {"token": encoded} 
            return jsonify(msg),200

#resets login_number to 0 if it reaches max value
def increment_login_number():
    global login_number
    if(login_number == 2147483647):
        login_number = 0
    else:
        login_number = login_number + 1


@app.route('/app/login',methods=['POST'])
def login():
    data = request.get_json(force=True)
    username = data.get('username', None)
    password = data.get('password', None)
    hashpass = bcrypt.generate_password_hash(password)
    # If username and password are found, good login, generates authentication token
    if(database.users.find({"username": username}).count() > 0 ):
            user = database.users.find({"username": username})
            userPW = user[0].get('hashedPassword')
            if(bcrypt.check_password_hash(userPW, password)):
                increment_login_number()
                encoded = jwt.encode({'alg': "HS256", 'typ': "JWT", 'sub': username, 'num': str(login_number)}, secret, algorithm="HS256")
                msg = {"token": encoded} 
                return jsonify(msg),200
            else:
                msg = {"msg": "Invalid login"}
                return jsonify(msg),400
    else:
        msg = {"msg": "Invalid login"}
        return jsonify(msg),400
