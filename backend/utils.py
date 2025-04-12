import os
from mongoengine import connect
from dotenv import load_dotenv
from flask_bcrypt import generate_password_hash
from schema import User, Project, Hardware, Checkout

def reset():
    User.drop_collection()
    Project.drop_collection()
    Hardware.drop_collection()
    Checkout.drop_collection()

def create_test_users():
    hashed_password = generate_password_hash("password").decode("utf-8")
    user = User(
        userid="test",
        password=hashed_password,
    )
    user.save()

def create_test_hwsets():
    hwset1 = Hardware(
        item="Hardware Set 1",
        available=10,
        checked_out=0,
    )
    hwset2 = Hardware(
        item="Hardware Set 2",
        available=10,
        checked_out=0,
    )
    hwset1.save()
    hwset2.save()

def create_test_projects():
    hwset1 = Hardware.objects(item="Hardware Set 1").first()
    hwset2 = Hardware.objects(item="Hardware Set 2").first()
    project1 = Project(
        project_id=123,
        project_name="Project 1",
        description="A set of hardware components",
        hardware_list=[hwset1, hwset2],
        authorized_users=[User.objects(userid="test").first()]
    )
    project2 = Project(
        project_id=456,
        project_name="Project 2",
        description="Another set of hardware components",
        hardware_list=[hwset1, hwset2],
        authorized_users=[User.objects(userid="test").first()]
    )
    project1.save()
    project2.save()

def setup():
    load_dotenv(dotenv_path="../.env")
    mongo_uri = os.getenv("MONGO_URI")
    connect("461L", host=mongo_uri)

if __name__ == "__main__":
    setup()
    reset()
    create_test_users()
    create_test_hwsets()
    create_test_projects()
    print("Test data created successfully :)")