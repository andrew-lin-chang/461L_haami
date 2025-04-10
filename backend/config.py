import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    JWT_SECRET = os.getenv("JWT_SECRET")
    