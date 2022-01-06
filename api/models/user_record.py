from peewee import *

from db import DATABASE
from models.record import Record
from models.user import User

class UserRecord(UserMixin, Model):
    user = ForeignKeyField(User, backref='user_records')
    record = ForeignKeyField(Record, backref='user_records')
    class Meta:
        database = DATABASE
