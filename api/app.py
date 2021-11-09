from flask import Flask, g
from flask_cors import CORS
from flask_login import LoginManager
import os

# what do we import from locally?
from db import DATABASE, initialize
from record import Record
from favorite import Favorite
from user import User
from resources.records import record
from resources.users import user

# what options does our flask app need
DEBUG = True
PORT = 8000

login_manager = LoginManager()

# how do we create our flask app
app = Flask(__name__)

app.secret_key = os.environ.get('SECRET') or 'recordslongconfusingkey'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(userid):
    try:
        return User.get(User.id == userid)
    except:
        return None

# set up before and after request decorators
@app.before_request
def before_request():
    # make the global db be DATABASE
    g.db = DATABASE
    # open the global db connection
    g.db.connect()

@app.after_request
def after_request(response):
    g.db.close()
    return response

# let's make an index route
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
    # fetching the client url from an environment variable
    origins.append(os.environ.get('CLIENT_URL'))

CORS(app, origins=origins, supports_credentials=True)


# what's the main deal?
if __name__ == '__main__':
    # initialize tables
    initialize([Record, User, Favorite])
    # run server
    app.run(debug=DEBUG, port=PORT)