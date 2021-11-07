from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from record import Record
from favorite import Favorite
from user import User

# how do we make our blueprint?
record = Blueprint('records', __name__, url_prefix='/api/records')

@record.route('/', methods=['GET'])
@login_required
def get_all_records():
    try:
        records = [model_to_dict(record) for record in Record]
        return jsonify(records), 200
    except DoesNotExist:
        return jsonify(message="Error getting records."), 500

@record.route('/new', methods=['POST'])
@login_required
def add_record():
    body = request.get_json()
    record = Record.create(**body)
    # Favorite.create(record=record, user=current_user)
    return jsonify(model_to_dict(record)), 201

@record.route('/search/<int:record_id>', methods=['POST'])
@login_required
def add_collection(record_id):
    try:
        record = Record.get_by_id(record_id)
        if Favorite.get_or_none(Favorite.user == current_user.id, Favorite.record == record.id) != None:
            return jsonify(message="This pressing already exists!"), 400
        Favorite.create(user=current_user, record=record, in_wishlist=False)
        user = User.get_by_id(current_user.id)
        user_dict = model_to_dict(user, backrefs=True)
        del user_dict['password']
        return jsonify(user_dict), 201
    except DoesNotExist:
        return jsonify(message="Error getting record."), 500

@record.route('/<int:record_id>', methods=['DELETE'])
@login_required
def delete_record(record_id):
        (Record
            .delete()
            .where(Record.id==record_id).execute())
        return jsonify(message="YASSSS"), 204