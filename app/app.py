import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
import jwt
import random

app = Flask(__name__, static_folder='../app/build', static_url_path='/')
bcrypt = Bcrypt()
mongoClient = MongoClient("db", 27017)
database = mongoClient["database"]
users = database["users"]
calendars = database["calendar"]
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
    print("THIS IS A TEST", flush=True)
    data = request.get_json(force=True)
    username = data.get('username', None)
    email = data.get('email', None)
    password = data.get('password', None)

    if username == "" or email == "" or password == "":
        msg = {"msg": "Credential left blank"}
        return jsonify(msg), 200
    else:
        hashpass = bcrypt.generate_password_hash(
            password)  # Password is hashed

        # Check if this username or email already exists in database
        if(database.users.find({"username": username}).count() > 0 or database.users.find({"email": email}).count() > 0):
            msg = {"msg": "Username/Email taken"}
            return jsonify(msg), 200
        # If account not taken, make account and generate authentication token
        else:
            # increment_login_number()
            # encoded = jwt.encode({'alg': "HS256", 'typ': "JWT", 'sub': username, 'num': str(
            #     login_number)}, secret, algorithm="HS256")
            token = genToken()
            hashedToken = bcrypt.generate_password_hash(token) #Hashed token, can't store plain token in db
            dataVal = {"username": username,
                       "email": email, "hashedPassword": hashpass, "token": hashedToken, "darkmode": False}
            x = users.insert_one(dataVal)
            msg = {"token": token}
            return jsonify(msg), 200

# resets login_number to 0 if it reaches max value


def increment_login_number():
    global login_number
    if(login_number == 2147483647):
        login_number = 0
    else:
        login_number = login_number + 1

# This generates a token, no need for JWT
def genToken():
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    token = ''
    i = 0
    while(i < 32):
        num = round(random.random() * (len(alphabet) - 1))
        token = token + alphabet[num]
        i = i + 1
    return token


@app.route('/app/login', methods=['POST'])
def login():
    data = request.get_json(force=True)
    username = data.get('username', None)
    password = data.get('password', None)
    hashpass = bcrypt.generate_password_hash(password)
    # If username and password are found, good login, generates authentication token
    if(database.users.find({"username": username}).count() > 0):
        user = database.users.find({"username": username})
        userPW = user[0].get('hashedPassword')
        if(bcrypt.check_password_hash(userPW, password)):
            # increment_login_number()
            # encoded = jwt.encode({'alg': "HS256", 'typ': "JWT", 'sub': username, 'num': str(
            #     login_number)}, secret, algorithm="HS256")

            token = genToken()
            hashedToken = bcrypt.generate_password_hash(token) #Hashed token, can't store plain token in db
            # update collection users with username as username and set token to new encoded
            users.update_one({'username': username}, {
                             '$set': {'token': hashedToken}})
            msg = {"token": token}
            return jsonify(msg), 200
        else:
            msg = {"msg": "Invalid login"}
            return jsonify(msg), 200
    else:
        msg = {"msg": "Invalid login"}
        return jsonify(msg), 200


@app.route('/app/calendarcreate', methods=['POST'])
def calendarcreate():
    data = request.get_json(force=True)
    name = data.get('name', None)
    token = data.get('token', None)
    if name == "" or calendars.find({'name': name}).count() > 0:
        msg = {"msg": "incorrect"}
        return jsonify(msg), 200
    calendars.insert_one({'membercount': 1, 'name': name})
    usersArr = users.find({})
    for user in usersArr:
        hashedToken = user.get('token')
        if(bcrypt.check_password_hash(hashedToken, token)):
            users.update({"token": hashedToken}, {
                        "$push": {"Joined Calendars": name}}, upsert=True)
            msg = {"msg": name}
            return jsonify(msg), 200
    return 400


@app.route('/app/calendarAdd', methods=['POST'])
def calendaradd():
    return NotImplemented

# This will query logged in user to find calendars they are in and send the names and # of poeple in them to lobby


@app.route('/app/lobby', methods=['POST'])
def lobby():
    data = request.get_json(force=True)
    token = data.get('token', None)
    account = ''
    usersArr = users.find({})
    for user in usersArr:
        hashedToken = user.get('token')
        if(bcrypt.check_password_hash(hashedToken, token)):
            account = user
    if(account != ''):
        joinedCalendars = account.get('Joined Calendars')
        currentJoined = []
        if(joinedCalendars != None):
            if len(joinedCalendars) > 0:
                for x in joinedCalendars:
                    currentJoined.append(calendars.find_one(
                        {'name': x}, {'_id': False, 'name': True, 'membercount': True}))
                return jsonify(currentJoined), 200
    msg = {"msg": "zero"}
    return jsonify(msg), 200

# This returns users profile information
@app.route('/app/profile', methods=['POST'])
def profile():
    data = request.get_json(force=True)
    token = data.get('token', None)
    account = ''
    usersArr = users.find({})
    for user in usersArr:
        hashedToken = user.get('token')
        if(bcrypt.check_password_hash(hashedToken, token)):
            account = user
    if(account != ''):
        username = account.get('username')
        email = account.get('email')
        darkmode = account.get('darkmode')
        joinedCalendars = account.get('Joined Calendars')
        return jsonify(username, email, darkmode), 200
    msg = {"msg": "zero"}
    return jsonify(msg), 200

# This changes dark mode settings
@app.route('/app/darkmode', methods=['POST'])
def darkmode():
    data = request.get_json(force=True)
    token = data.get('token', None)
    darkmode = data.get('darkmode', None)
    account = ''
    usersArr = users.find({})
    for user in usersArr:
        hashedToken = user.get('token')
        if(bcrypt.check_password_hash(hashedToken, token)):
            account = user
    if(account != ''):
        username = account.get('username')
        print(username, flush=True)
        print(darkmode, flush=True)
        users.update_one({'username': username}, {'$set': {'darkmode': darkmode}})
        msg = {"msg": "zero"}
        return jsonify(msg), 200
    print("User not found", flush=True)
    msg = {"msg": "zero"}
    return jsonify(msg), 200
