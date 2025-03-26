from mongoengine import Document, ReferenceField, ListField, StringField, IntField

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)

class Project(Document):
    name = StringField(required=True, unique=True)
    description = StringField()
    authorized_users = ListField(ReferenceField('User'))
    hardware_list = ListField(ReferenceField('Hardware'))

class Hardware(Document):
    name = StringField(required=True)
    project = ReferenceField('Project', required=True)
    available = IntField(required=True)
    checked_out = IntField(required=True)
    checkouts = ListField(ReferenceField('Checkout'))

class Checkout(Document):
    user = ReferenceField('User', required=True)
    hardware = ReferenceField('Hardware', required=True)
    quantity = IntField(required=True)