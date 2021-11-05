from peewee import *

from db import DATABASE

class Record(Model):
    name = CharField
    year_pressed = CharField()
    catalog_number = CharField()
    album_art: CharField()

    class Meta:
        database = DATABASE