from flask import Blueprint, request, jsonify
from schema import Checkout, User, Hardware

checkout_routes = Blueprint('checkouts', __name__)

@checkout_routes.get("/")
def get_checkouts():
    checkouts = Checkout.objects()

    checkout_list = []
    for checkout in checkouts:
        user = checkout.user
        hardware = checkout.hardware

        checkout_list.append({
            "user": user.userid if user else None,  
            "hardware": hardware.item if hardware else None, 
            "quantity": checkout.quantity,
        })
    
    return jsonify(checkout_list), 200
