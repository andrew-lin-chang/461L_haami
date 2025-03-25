from mongoengine import ReferenceField, IntField, Document

class Checkout(Document):
    user = ReferenceField('User', required=True)
    hardware = ReferenceField('Hardware', required=True)
    quantity = IntField(required=True)