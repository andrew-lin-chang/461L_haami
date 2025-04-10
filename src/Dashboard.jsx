import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import ProjectCard from "./ProjectCard";
import { useAuth } from "./AuthContext";

function Header() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        padding: "12px",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ fontWeight: "bold" }}
        >
          haami
        </Typography>

        <Button variant="outlined" color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default function Dashboard() {
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    project_id: "",
    project_name: "",
    description: "",
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let response = await fetch("http://localhost:5000/projects");
        if (response.ok) {
          let data = await response.json();
          setProjects(data);
        } else {
          console.error("Error fetching projects");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJoinProject = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams(formData).toString();
      let response = await fetch("http://localhost:5000/projects/join", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const existingProject = {
          project_id: formData.project_id,
          project_name: formData.project_name,
          description: formData.description,
          authorized_users: formData.authorized_users,
          hardware: [],
        };
        setProjects([...projects, existingProject]);
        setOpenJoinDialog(false);
      } else {
        console.error(data);
        alert("Error joining project: " + data.message);
      }
    } catch (err) {
      console.error("Error joining project:", err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    const newProject = {
      project_id: formData.project_id,
      project_name: formData.project_name,
      description: formData.description,
      authorized_users: [],
      hardware: [],
    };

    try {
      let response = await fetch("http://localhost:5000/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        setProjects([...projects, newProject]);
        setOpenCreateDialog(false);
      } else {
        const data = await response.json();
        console.error(data);
        alert("Error creating project: " + data.message);
      }
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  return (
    <div>
      <Header />
      <Container style={{ marginTop: "80px" }}>
        <Typography variant="h4" gutterBottom>
          XYZ User's Projects
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px", marginRight: "10px" }}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create New Project
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginBottom: "20px" }}
          onClick={() => setOpenJoinDialog(true)}
        >
          Join Existing Project
        </Button>
        <div>
          {projects &&
            projects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
        </div>
      </Container>

      {/* Join Existing Project Dialog */}
      <Dialog open={openJoinDialog} onClose={() => setOpenJoinDialog(false)}>
        <DialogTitle>Join Existing Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the Project ID to join an existing project.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Project ID"
            name="project_id"
            type="text"
            fullWidth
            value={formData.project_id}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenJoinDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleJoinProject} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create New Project Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the Project ID, Name, and Description to create a new
            project.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Project ID"
            name="project_id"
            type="text"
            fullWidth
            value={formData.project_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Project Name"
            name="project_name"
            type="text"
            fullWidth
            value={formData.project_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Project Description"
            name="description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateProject} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
