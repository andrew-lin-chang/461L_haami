from flask import Blueprint, request, jsonify
from schema import User, Project, Hardware, Checkout

project_routes = Blueprint('projects', __name__)

@project_routes.get("/")
def get_projects():
    userid = request.args.get("userid")

    user = User.objects(userid=userid).first()
    if not user:
        return jsonify({"message": "User ID not found"}), 404
    
    projects = Project.objects(authorized_users=user)
    project_list = []
    for project in projects:
        project_list.append({
            "project_id": project.project_id,
            "project_name": project.project_name,
            "description": project.description,
            "authorized_users": [user.userid for user in project.authorized_users],
            "hardware": [{"item": hw.item, "available": hw.available, "checked_out": hw.checked_out} for hw in project.hardware_list]
        })
    return jsonify(project_list), 200

@project_routes.post("/create")
def create_project():
    data = request.json
    project_id = data.get("project_id")
    project_name = data.get("project_name")
    description = data.get("description")
    userid = data.get("userid")

    user = User.objects(userid=userid).first()
    if not user:
        return jsonify({"message": "User ID not found"}), 404

    # each project will have HWset1 and HWset2 by default
    hardware_list = Hardware.objects()

    if Project.objects(project_id=project_id).first():
        return jsonify({"message": "Project ID already exists"}), 400
    
    else:
        project = Project(project_id=project_id, project_name=project_name, description=description, hardware_list=hardware_list, authorized_users=[user])
        project.save()
        return jsonify({"message": "Project created successfully"}), 200

@project_routes.post("/join")
def join_project():
    data = request.json
    project_id = data.get("project_id")
    userid = data.get("userid")

    user = User.objects(userid=userid).first()
    if not user:
        return jsonify({"message": "User ID not found"}), 404

    project = Project.objects(project_id=project_id).first()
    if not project:
        return jsonify({"message": "Project ID not found"}), 404

    if user in project.authorized_users:
        return jsonify({"message": "User already authorized for this project"}), 400

    project.authorized_users.append(user)
    project.save()

    return jsonify({"message": "User added to the project successfully"}), 200
