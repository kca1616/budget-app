from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

#from models.record import Record
from models.user import User
from models.message import Message

messageBP = Blueprint('messages', __name__, url_prefix='/api/messages')

@messageBP.route('/', methods=["GET"])
@login_required
def get_messages():
    # read = json.loads(read)
    # print(read)
    try:
        messages = [model_to_dict(message) for message in Message.select().where(Message.recipient == current_user.id)]
        return jsonify(messages), 200
    except DoesNotExist:
        return jsonify(message= "Error getting messages."), 500

# add record insertion logic
@messageBP.route('/send', methods=["POST"])
@login_required
def send_message():
    try:
        sender = current_user.id
        body = request.get_json()
        body['sender'] = sender
        message = Message.create(**body)
        return jsonify(model_to_dict(message)), 200
    except DoesNotExist:
        return jsonify(message="error sending message"), 500