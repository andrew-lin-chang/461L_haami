import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
from flask_bcrypt import Bcrypt

load_dotenv(dotenv_path="../.env")

mongo_uri = os.getenv("MONGO_URI")

app = Flask(__name__)
bcrypt = Bcrypt(app)

@app.route("/")
def home():
    try: 
        client = MongoClient(mongo_uri)
        client.admin.command("ping")
        return jsonify({"message": "Connected to MongoDB"}), 200

    except Exception as e:
        return jsonify({"message": f"Failed to connect to MongoDB", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)