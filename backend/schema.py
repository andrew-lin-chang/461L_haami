from mongoengine import Document, ReferenceField, ListField, StringField, IntField

class User(Document):
    userid = StringField(required=True, unique=True)
    password = StringField(required=True)

class Project(Document):
    project_id = IntField(required=True, unique=True)
    project_name = StringField(required=True)
    description = StringField()
    authorized_users = ListField(ReferenceField('User'), default=list)
    hardware_list = ListField(ReferenceField('Hardware'), default=list)

class Hardware(Document):
    name = StringField(required=True)
    project = ReferenceField('Project', required=True)
    available = IntField(required=True)
    checked_out = IntField(required=True)
    checkouts = ListField(ReferenceField('Checkout'), default=list)

class Checkout(Document):
    user = ReferenceField('User', required=True)
    hardware = ReferenceField('Hardware', required=True)
    quantity = IntField(required=True)