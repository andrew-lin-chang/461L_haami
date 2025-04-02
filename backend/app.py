import os
from schema import User, Project, Hardware, Checkout
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from mongoengine import connect 

load_dotenv(dotenv_path="../.env")

mongo_uri = os.getenv("MONGO_URI")

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

connect("461L", host=mongo_uri)

@app.route("/")
def home():
    try:
        client = MongoClient(mongo_uri)
        client.admin.command("ping")
        return jsonify({"message": "Connected to MongoDB"}), 200

    except Exception as e:
        return jsonify(
            {"message": "Failed to connect to MongoDB", "error": str(e)}
        ), 500


@app.post("/signup")
def signup():
    data = request.json
    userid = data.get("userid").strip()
    password = data.get("password").strip()

    if not userid or not password:
        return jsonify({"message": "userid and password are required"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    if User.objects(userid=userid).first():
        return jsonify({"message": "User already exists"}), 400
    else:
        user = User(userid=userid, password=hashed_password)
        user.save()
        return jsonify({"message": "User registered successfully"}), 200

@app.post("/login")
def login():
    data = request.json
    userid = data.get("userid")
    password = data.get("password")

    if not userid or not password:
        return jsonify({"message": "userid and password are required"}), 400

    user = User.objects(userid=userid).first()
    if not user:
        return jsonify({"message": "User does not exist"}), 400

    elif not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid password"}), 400

    return jsonify({"message": "Login successful"}), 200

@app.get("/project")
def get_projects():
    projects = Project.objects()
    project_list = []
    for project in projects:
        project_list.append({
            "project_id": project.project_id,
            "project_name": project.project_name,
            "description": project.description,
            "authorized_users": [user.userid for user in project.authorized_users],
            "hardware": [hardware.name for hardware in project.hardware_list]
        })
    return jsonify(project_list), 200

@app.post("/project")
def create_project():
    data = request.json
    project_id = data.get("project_id")
    project_name = data.get("project_name")
    description = data.get("description")

    # each project will have HWset1 and HWset2 by default
    hardware_list = Hardware.objects()

    if Project.objects(project_id=project_id).first():
        return jsonify({"message": "Project ID already exists"}), 400
    
    else:
        project = Project(project_id=project_id, project_name=project_name, description=description, hardware_list=hardware_list)
        project.save()
        return jsonify({"message": "Project created successfully"}), 200

@app.post("/checkout")
def checkout_hardware():
    data = request.json
    userid = data.get("userid")
    item = data.get("item")
    quantity = data.get("quantity")

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

if __name__ == "__main__":
    app.run(debug=True)
