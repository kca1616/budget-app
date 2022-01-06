from datetime import datetime

from peewee import CharField, DateTimeField
from models.base import BaseModel


from db import DATABASE


class Record(BaseModel):
    name = CharField()
    year_pressed = CharField()
    catalog_number = CharField()
    album_art = CharField()
    notes = CharField()
    created_at = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = DATABASE
