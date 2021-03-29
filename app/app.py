import time
from flask import Flask,request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError

app = Flask(__name__, static_folder='../app/build', static_url_path='/')
bcrypt = Bcrypt()
mongoClient = MongoClient("db", 27017) 
database = mongoClient["database"]
users = database["users"]

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
        print(hashpass)                                     #The info needs to be stored onto database
        print(data)
        print(username)
        # Check if this username or email already exists in database
        if(database.users.find({"username": username}).count() > 0 or database.users.find({"email": email}).count() > 0):
            msg = {"msg": "Username/Email taken"}
            return jsonify(msg),400
        # If account not taken, make account (No auth yet, needs to be implemented!!!)
        else: 
            dataVal = {"username": username, "email": email, "hashedPassword": hashpass}
            x = users.insert_one(dataVal)
            msg = {"msg": "Account created!"}
            return jsonify(msg),200

# @app.route('/app/login',methods=['POST'])
# def login():
