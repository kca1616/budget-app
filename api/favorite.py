from peewee import *

from db import DATABASE
from record import Record
from user import User

class Favorite(Model):
    record = ForeignKeyField(Record, backref='favorites')
    user = ForeignKeyField(User, backref='favorites')
    in_wishlist = BooleanField

    class Meta:
        database = DATABASE