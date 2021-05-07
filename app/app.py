import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from flask_socketio import SocketIO, send, emit
import jwt
import random

app = Flask(__name__, static_folder='../app/build', static_url_path='/')
bcrypt = Bcrypt()
mongoClient = MongoClient("db", 27017)
database = mongoClient["database"]
users = database["users"]
calendars = database["calendar"]
socketIO = SocketIO(app, cors_allowed_origins="*")
secret = "supersecretstring"
login_number = 0
loggedIn = []

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/app/create', methods=['POST'])
def create():
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
        
        else:
            token = genToken()
            hashedToken = bcrypt.generate_password_hash(token) #Hashed token, can't store plain token in db
            loggedIn.append(token)
            dataVal = {"username": username,
                       "email": email, "hashedPassword": hashpass, "token": hashedToken, "darkmode": False}
            x = users.insert_one(dataVal)
            msg = {"token": token}
            return jsonify(msg), 200




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
        darkmodeVal = user[0].get('darkmode')
        if(bcrypt.check_password_hash(userPW, password)):
            token = genToken()
            hashedToken = bcrypt.generate_password_hash(token) #Hashed token, can't store plain token in db
            loggedIn.append(token)
            # update collection users with username as username and set token to new encoded
            users.update_one({'username': username}, {
                             '$set': {'token': hashedToken}})
            msg = {"token": token, "darkmode": darkmodeVal}
            return jsonify(msg), 200
        else:
            msg = {"msg": "Invalid login"}
            return jsonify(msg), 200
    else:
        msg = {"msg": "Invalid login"}
        return jsonify(msg), 200


@app.route('/app/logout', methods=['POST'])
def logout():
    data = request.get_json(force=True)
    token = data.get('token', None)
    account = ''
    usersArr = users.find({})
    for user in usersArr:
        hashedToken = user.get('token')
        if(bcrypt.check_password_hash(hashedToken, token)):
            if loggedIn != None and token in loggedIn:
                print("======================================",flush=True)
                print(loggedIn,flush=True)
                loggedIn.remove(token)
    msg = {"msg":"good"}
    return jsonify(msg),200

@app.route('/app/calendar/create', methods=['POST'])
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
            calendars.update({'name':name},{'$push': {'members': user.get('username')}}, upsert=True)
            msg = {"msg": name}
            return jsonify(msg), 200
    return 200


@app.route('/app/calendar/join', methods=['POST'])
def joincalendar():
    data = request.get_json(force=True)
    token = data.get('token', None)
    name = data.get('name',None)
    account = None
    usersArr = users.find({})
    for user in usersArr:
        hashedToken = user.get('token')
        if(bcrypt.check_password_hash(hashedToken, token)):
            users.update({"token": hashedToken}, {
                        "$push": {"Joined Calendars": name}}, upsert=True)
            calendars.update({'name':name},{'$inc': {'membercount': 1}}, upsert=True)
            calendars.update({'name':name},{'$push': {'members': user.get('username')}}, upsert=True)
    msg = {"msg": "ok"}
    return jsonify(msg), 200

@app.route('/app/calendar/all', methods=['POST'])
def calendar():
    data = request.get_json(force=True)
    token = data.get('token', None)
    account = None
    usersArr = users.find({})
    for user in usersArr:
        hashedToken = user.get('token')
        if(bcrypt.check_password_hash(hashedToken, token)):
            account = user
    joinedCalendars = account.get('Joined Calendars')
    if joinedCalendars == None:
        joinedCalendars = []
    allCalendars = calendars.find({},{'_id':False,'name':True})
    result = []
    for calendar in allCalendars:
        name = calendar.get('name')
        if calendar.get('name') not in joinedCalendars:
            result.append({'name':name})
    return jsonify(result),200

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
        msg = {"darkmode": darkmode}
        return jsonify(msg), 200
    print("User not found", flush=True)
    msg = {"msg": "zero"}
    return jsonify(msg), 200

# handles image uploaded through form
@app.route('/app/pictureUpload', methods=['POST'])
def upload():
    #data contains image bytes
    data = request.get_data()
    msg = {"msg": "zero"}
    return jsonify(msg), 200

    


@app.route('/app/home', methods=['POST'])
def calendarload():
    data = request.get_json(force=True)
    token = data.get('token',None)
    title = data.get('paramData',None).get('title',None)
    account = ''
    usersArr = users.find({})
    currentlyLogged = []
    for user in usersArr:
        hashedToken = user.get('token')
        for logged in loggedIn:
            if bcrypt.check_password_hash(hashedToken, logged):
                currentlyLogged.append(user.get('username'))
    x = calendars.find_one({'name':title},{'_id':False,'name':True,'members':True,'membercount':True})
    x['online'] = currentlyLogged
    print(x,flush=True)
    msg = {"msg": "zero"}
    return jsonify(x), 200    


# Handles when someone joins a calendar

# Holds all connected (users, socketID) and their calendar they're currently connected to
connectedUsers = []
chats = []

@socketIO.on('connect')
def test_connect():
    print("Connection here!!!!!!")
    print(chats)

@socketIO.on("loggedin")
def handleMssage(msg):
    print("HEREEEEE")
    msg['socketID'] = request.sid
    connectedUsers.append(msg)
    print(connectedUsers)
    # -------------------------------------
    retVal = []
    retValSender = [] #For private chats
    # Find who to send chat to
    # If message was sent to everyone
    for chat in chats:
        if chat['title'] == msg['title'] and chat['sentTo'] == 'Everyone':
            retVal.append(chat)
        # Now, send the retva to everyone in that calendar
    # Else if msg is sent to someone directly
    else:
        for chat in chats:
            if chat['title'] == msg['title'] and chat['sentTo'] != 'Everyone' and (chat['username'] == msg['username'] or chat['sentTo'] == msg['username']):
                retValSender.append(chat)
        # Now, send the retva to everyone in that calendar
        
    # -------------------------------------
    for user in connectedUsers:
        if msg['title'] == user['title']:
            emit('userUpdate', {'msg': connectedUsers, 'chats': retVal, 'privateChats': retValSender}, room=user['socketID'])
    # Send chats too


# Handles recieving a message
@socketIO.on('sendMessage')
def recMessage(msg):
    chats.append(msg)
    retVal = []
    retValSender = [] #For private chats
    # Find who to send chat to
    # If message was sent to everyone
    if msg['sentTo'] == 'Everyone':
        for chat in chats:
            if chat['title'] == msg['title'] and chat['sentTo'] == 'Everyone':
                retVal.append(chat)
        # Now, send the retva to everyone in that calendar
        for user in connectedUsers:
            if msg['title'] == user['title']:
                emit('recieveChats', {'msg': retVal}, room=user['socketID'])
    # Else if msg is sent to someone directly
    else:
        for chat in chats:
            if chat['title'] == msg['title'] and chat['sentTo'] != 'Everyone' and (chat['sentTo'] == msg['sentTo'] or chat['username'] == msg['username']):
                retVal.append(chat)
            if chat['title'] == msg['title'] and chat['sentTo'] != 'Everyone' and (chat['username'] == msg['username'] or chat['sentTo'] == msg['username']):
                retValSender.append(chat)
        # Now, send the retva to everyone in that calendar
        for user in connectedUsers:
            if msg['sentTo'] == user['username']:
                emit('recievePrivateChats', {'msg': retValSender}, room=user['socketID'])
            elif msg['username'] == user['username']:
                emit('recievePrivateChats', {'msg': retValSender}, room=user['socketID'])
    # emit('recieveChats', {'msg': chats})

# Handles user leaving a calendar
@socketIO.on('disconnect')
def handleMessage():
    socketIDDisc = request.sid
    title = ''
    for user in connectedUsers:
        if user['socketID'] == socketIDDisc:
            connectedUsers.remove(user)
            title = user['title']
    for user in connectedUsers:
        if title == user['title']:
            emit('userUpdate', {'msg': connectedUsers}, room=user['socketID'])

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')