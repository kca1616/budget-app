from flask import Blueprint, jsonify, request
from peewee import DoesNotExist
from flask_bcrypt import check_password_hash, generate_password_hash
from flask_login import login_user, login_required, logout_user
from playhouse.shortcuts import model_to_dict
from models.user import User

userBP = Blueprint('users', __name__, url_prefix='/auth')


@userBP.route('/register', methods=['POST'])
def register():
    body = request.get_json()
    try:
        query = User.select().where((User.email == body["email"]) | (User.username == body["username"])).limit(1)
        if len(query) == 0:
            raise DoesNotExist
        return jsonify(message='Username or email already taken.'), 200
    except DoesNotExist:
        body['password'] = generate_password_hash(body['password'])

        user = User.create(**body)
        login_user(user)

        user_dict = model_to_dict(user)
        del user_dict['password']
        return jsonify(user_dict), 201


@userBP.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    body['username'] = body['username'].lower()
    try:
        user = User.get(User.username == body['username'])
        user_dict = model_to_dict(user)

        if check_password_hash(user_dict['password'], body['password']):
            login_user(user)
            del user_dict['password']
            return jsonify(user_dict), 200

        else:
            return jsonify(message='Username or password is incorrect!')
    except DoesNotExist:
        return jsonify(message='Username or password is incorrect.'), 401


@userBP.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(message="Successful logout!"), 200
