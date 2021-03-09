import time
from flask import Flask

app = Flask(__name__, static_folder='../build', static_url_path='/')

@app.route ('/')
def home():
    return render_template('/reactfrontend/public/index.html')

@app.route('/time')
def get_current_time():
    return {'time': time.time()}
