import os
from flask import Flask
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(dotenv_path="../.env")

mongo_uri = os.getenv("MONGO_URI")

app = Flask(__name__)

@app.route("/")
def home():
    try: 
        client = MongoClient(mongo_uri)
        db = client["sample_mflix"]
        res = db.list_collection_names()
        return f"Collections in database: {res}", 200

    except Exception as e:
        return f"Error connecting: {e}", 500

if __name__ == "__main__":
    app.run(debug=True)