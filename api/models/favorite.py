from peewee import *

from db import DATABASE
from models.record import Record
from models.user import User

class Favorite(Model):
    record = ForeignKeyField(Record, backref='favorites')
    user = ForeignKeyField(User, backref='favorites')
    in_wishlist = BooleanField(default=True)

    class Meta:
        database = DATABASE