from flask import Blueprint, request, jsonify
from schema import User, Hardware, Checkout

hardware_routes = Blueprint('hardware', __name__)

@hardware_routes.post("/checkout")
def checkout_hardware():
    data = request.json
    userid = data.get("userid")
    item = data.get("item")
    quantity = int(data.get("quantity"))

    # Validate input
    if not userid or not item or not quantity:
        return jsonify({"message": "userid, hardware_name, and quantity are required"}), 400

    if not isinstance(quantity, int) or quantity <= 0:
        return jsonify({"message": "quantity must be a positive integer"}), 400

    # Find the user
    user = User.objects(userid=userid).first()
    if not user:
        return jsonify({"message": f"User '{userid}' not found"}), 404

    # Find the hardware
    hardware = Hardware.objects(item=item).first()
    if not hardware:
        return jsonify({"message": f"Hardware '{item}' not found"}), 404

    # Check availability
    if hardware.available < quantity:
        return jsonify({"message": f"Not enough hardware available. Only {hardware.available} left"}), 400

    # Update hardware availability
    hardware.available -= quantity
    hardware.checked_out += quantity
    hardware.save()

    # Create a checkout record
    checkout = Checkout(user=user, hardware=hardware, quantity=quantity)
    checkout.save()

    return jsonify({
        "message": f"Successfully checked out {quantity} of '{item}' for user '{userid}'",
        "available": hardware.available,
        "checked_out": hardware.checked_out
    }), 200

@hardware_routes.post("/checkin")
def checkin_hardware():
    data = request.json
    userid = data.get("userid")
    item = data.get("item")
    quantity = int(data.get("quantity"))

    # Validate input
    if not userid or not item or not quantity:
        return jsonify({"message": "userid, hardware_name, and quantity are required"}), 400

    if not isinstance(quantity, int) or quantity <= 0:
        return jsonify({"message": "quantity must be a positive integer"}), 400

    # Find the user
    user = User.objects(userid=userid).first()
    if not user:
        return jsonify({"message": f"User '{userid}' not found"}), 404

    # Find the hardware
    hardware = Hardware.objects(item=item).first()
    if not hardware:
        return jsonify({"message": f"Hardware '{item}' not found"}), 404

    # Find the checkout record
    checkout = Checkout.objects(user=user, hardware=hardware).first()
    if not checkout or checkout.quantity < quantity:
        return jsonify({"message": f"No valid checkout found or quantity exceeds checked out amount"}), 400

    # Update hardware availability
    hardware.available += quantity
    hardware.checked_out -= quantity
    hardware.save()

    # Update or delete the checkout record
    checkout.quantity -= quantity
    if checkout.quantity == 0:
        checkout.delete()
    else:
        checkout.save()

    return jsonify({
        "message": f"Successfully checked in {quantity} of '{item}' for user '{userid}'",
        "available": hardware.available,
        "checked_out": hardware.checked_out
    }), 200