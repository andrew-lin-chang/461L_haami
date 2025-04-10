import os
import datetime
import jwt
from schema import User, Project, Hardware, Checkout
from flask import Flask, jsonify, request
from pymongo import MongoClient
from extensions import bcrypt
from flask_cors import CORS
from mongoengine import connect 
from config import Config
from routes.auth_routes import auth_routes
from routes.project_routes import project_routes
from routes.hardware_routes import hardware_routes

app = Flask(__name__)
app.config.from_object(Config)

bcrypt.init_app(app)
CORS(app, supports_credentials=True)

connect("461L", host=Config.MONGO_URI)

app.register_blueprint(auth_routes, url_prefix="/auth")
app.register_blueprint(project_routes, url_prefix="/projects")
app.register_blueprint(hardware_routes, url_prefix="/hardware")

@app.route("/")
def home():
    try:
        client = MongoClient(Config.MONGO_URI)
        client.admin.command("ping")
        return jsonify({"message": "Connected to MongoDB"}), 200

    except Exception as e:
        return jsonify(
            {"message": "Failed to connect to MongoDB", "error": str(e)}
        ), 500

if __name__ == "__main__":
    app.run(debug=True)
