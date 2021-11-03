from peewee import PostgresqlDatabase

DATABASE = PostgresqlDatabase('records_db')

def initialize(tables):
    DATABASE.connect()
    DATABASE.create_tables(tables, safe=True)
    print("Tables created successfully!")
    DATABASE.close()