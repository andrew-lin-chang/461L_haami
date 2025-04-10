from flask import Blueprint, request, jsonify
from schema import Project, Hardware, Checkout

project_routes = Blueprint('projects', __name__)

@project_routes.get("/")
def get_projects():
    projects = Project.objects()
    project_list = []
    for project in projects:
        project_list.append({
            "project_id": project.project_id,
            "project_name": project.project_name,
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

    # each project will have HWset1 and HWset2 by default
    hardware_list = Hardware.objects()

    if Project.objects(project_id=project_id).first():
        return jsonify({"message": "Project ID already exists"}), 400
    
    else:
        project = Project(project_id=project_id, project_name=project_name, description=description, hardware_list=hardware_list)
        project.save()
        return jsonify({"message": "Project created successfully"}), 200
