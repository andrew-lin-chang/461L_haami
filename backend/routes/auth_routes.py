import jwt
import datetime
from config import Config
from flask import Blueprint, request, jsonify
from extensions import bcrypt 
from schema import User

auth_routes = Blueprint('auth', __name__)

def generate_jwt_token(userid):
    """Generate a JWT token for the given user ID. Returns signed token for authentication."""
    try:
        payload = {
            "userid": userid,
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=1), # expires in 1 day
            "iat": datetime.datetime.now(datetime.timezone.utc), # issued at time
        }
        token = jwt.encode(payload, Config.JWT_SECRET, algorithm="HS256")
        return token
    except Exception as e:
        return jsonify({"message": "Error generating token", "error": str(e)}), 500

@auth_routes.post("/login")
def login():
    data = request.json
    userid = data.get("userid")
    password = data.get("password")

    user = User.objects(userid=userid).first()
    if not user:
        return jsonify({"message": "User does not exist"}), 400

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid password"}), 400

    else:
        token = generate_jwt_token(userid)
        return jsonify({"token": token}), 200
    
@auth_routes.post("/signup")
def signup():
    data = request.json
    userid = data.get("userid")
    password = data.get("password")

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    if User.objects(userid=userid).first():
        return jsonify({"message": "User already exists"}), 400
    else:
        user = User(userid=userid, password=hashed_password)
        user.save()
        token = generate_jwt_token(userid)
        return jsonify({"token": token, "message": "User registered successfully"}), 200
