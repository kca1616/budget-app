from peewee import ForeignKeyField, BooleanField, IntegerField

from db import DATABASE
from models.record import Record
from models.user import User
from models.base import BaseModel


class Marketplace(BaseModel):
    record = ForeignKeyField(Record, backref='favorites')
    user = ForeignKeyField(User, backref='favorites')
    active = BooleanField(default=True)
    price = IntegerField(default=0, null=False)

    class Meta:
        database = DATABASE
