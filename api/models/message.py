from peewee import BooleanField, ForeignKeyField, TextField

from db import DATABASE
from models.record import Record
from models.user import User
from models.base import BaseModel


class Message(BaseModel):
    sender = ForeignKeyField(User, backref='user')
    recipient = ForeignKeyField(User, backref='user')
    record = ForeignKeyField(Record, backref='record', null= True)
    message_body = TextField(null=False)
    read = BooleanField(default= False)

    class Meta:
        database = DATABASE
