import os
from peewee import PostgresqlDatabase
from playhouse.db_url import connect

if 'DATABASE_URL' in os.environ:
    # ...choose that database
    # playhouse figures out that our database is postgres based on the database url
    DATABASE = connect(os.environ.get('DATABASE_URL'))
else:
    DATABASE = PostgresqlDatabase('records_db')

def initialize(tables):
    DATABASE.connect()
    DATABASE.create_tables(tables, safe=True)
    print("Tables created successfully!")
    DATABASE.close()