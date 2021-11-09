from flask import Flask, g
from flask_cors import CORS
from flask_login import LoginManager
import os

from db import DATABASE, initialize
from record import Record
from favorite import Favorite
from user import User
from resources.records import record
from resources.users import user

DEBUG = True
PORT = 8000

login_manager = LoginManager()

app = Flask(__name__)

app.secret_key = os.environ.get('SECRET') or 'recordslongconfusingkey'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(userid):
    try:
        return User.get(User.id == userid)
    except:
        return None

@app.before_request
def before_request():
    g.db = DATABASE
    g.db.connect()

@app.after_request
def after_request(response):
    g.db.close()
    return response

@app.route('/')
def index():
    return 'Welcome to Record App!'

app.register_blueprint(record)
app.register_blueprint(user)

origins=['http://localhost:3000']


if 'DATABASE_URL' in os.environ:
    initialize([Record, User, Favorite])
    app.config['SESSION_COOKIE_SECURE'] = True
    app.config['SESSION_COOKIE_HTTPONLY'] = False
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    origins.append(os.environ.get('CLIENT_URL'))

CORS(app, origins=origins, supports_credentials=True)


if __name__ == '__main__':
    initialize([Record, User, Favorite])
    app.run(debug=DEBUG, port=PORT)