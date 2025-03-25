from mongoengine import Document, IntField, StringField, ReferenceField, ListField

class Hardware(Document):
    name = StringField(required=True)
    project = ReferenceField('Project', required=True)
    available = IntField(required=True)
    checkouts = ListField(ReferenceField('Checkout'))