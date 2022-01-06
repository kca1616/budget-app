from peewee import ForeignKeyField, TextField

from db import DATABASE
from models.record import Record
from models.user import User
from models.base import BaseModel


class Message(BaseModel):
    sender = ForeignKeyField(User, backref='user')
    recipient = ForeignKeyField(User, backref='user')
    record = ForeignKeyField(Record, backref='record')
    message = TextField(null=False)

    class Meta:
        database = DATABASE
