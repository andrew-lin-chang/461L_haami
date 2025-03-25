from mongoengine import Document, ReferenceField, ListField, StringField

class Project(Document):
    name = StringField(required=True, unique=True)
    authorized_users = ListField(ReferenceField('User'))
    hardware_list = ListField(ReferenceField('Hardware'))
