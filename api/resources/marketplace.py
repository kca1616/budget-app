from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from models.record import Record
from models.user import User
from models.marketplace import Marketplace

marketplace = Blueprint('marketplace', __name__, url_prefix='/api/marketplace')

@marketplace.route('/', methods=['GET'])
@login_required
def get_all_records():
    try:
        records = [model_to_dict(record) for record in Marketplace.select()]
        return jsonify(records), 200
    except DoesNotExist:
        return jsonify(message="Error getting marketplace records."), 500

@marketplace.route('/new', methods=['POST'])
@login_required
def add_record():
    user = User.get(current_user.id)
    body = request.get_json()
    body['user'] = user
    record = Marketplace.create(**body)
    return jsonify(model_to_dict(record)), 201

@marketplace.route('/update/<int:record_id>', methods=['PUT'])
@login_required
def update_listing(record_id):
    try:
        body = request.get_json()
        Marketplace.update(**body).where(Marketplace.record_id == record_id).execute()
        record = Record.get_by_id(record_id)
        return jsonify(model_to_dict(record)), 201
    except DoesNotExist:
        return jsonify(message="Error finding listing."), 500

@marketplace.route('/<int:record_id>', methods=['DELETE'])
@login_required
def delete_record(record_id):
        user = User.get(current_user.id)
        (Marketplace
            .delete()
            .where((Marketplace.record_id==record_id) & (Marketplace.user_id==user)).execute())
        return jsonify(message="YASSSS"), 204