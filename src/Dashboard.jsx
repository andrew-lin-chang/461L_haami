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
  CssBaseline,
  useScrollTrigger,
} from "@mui/material";
import ProjectCard from "./ProjectCard";
import CheckoutCard from "./CheckoutCard";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "12px",
        boxShadow: trigger ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h5" component="div" style={{ fontWeight: "bold" }}>
          haami
        </Typography>

        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={handleLogout}
        >
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
  const [refresh, setRefresh] = useState(false);
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      let response = await fetch(`${apiUrl}/projects/?userid=${userid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJoinProject = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(`${apiUrl}/projects/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: formData.project_id,
          userid: userid,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOpenJoinDialog(false);
      } else {
        console.error(data);
        alert("Error joining project: " + data.message);
      }
      fetchProjects();
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
      userid: userid,
      hardware: [],
    };

    try {
      let response = await fetch(`${apiUrl}/projects/create`, {
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
      fetchProjects();
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const removeProject = (project_id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.project_id !== project_id),
    );
  };

  return (
    <div>
      <Header />
      <Container style={{ marginTop: "80px" }}>
        <Typography variant="h4" gutterBottom fontWeight={"bold"}>
          {userid}'s Projects
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: "14px",
            marginBottom: "40px",
            marginRight: "10px",
          }}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create New Project
        </Button>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: "14px", marginBottom: "40px" }}
          onClick={() => setOpenJoinDialog(true)}
        >
          Join Existing Project
        </Button>
        <div>
          {projects &&
            projects.map((project) => (
              <ProjectCard
                key={project.project_id}
                project={project}
                onRemove={removeProject}
                onRefresh={triggerRefresh}
              />
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
      <CheckoutCard refresh={refresh} />
    </div>
  );
}
