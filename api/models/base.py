import datetime

from peewee import Model, AutoField, DateTimeField
from db import DATABASE


class BaseModel(Model):
    id = AutoField()
    created_at = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = DATABASE
