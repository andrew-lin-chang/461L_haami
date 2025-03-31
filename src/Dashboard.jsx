import React, { useState } from "react";
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

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token or user session
    window.location.href = "/login"; // Redirect to login page
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
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projects, setProjects] = useState([]);

  const handleOpenJoinDialog = () => {
    setOpenJoinDialog(true);
  };

  const handleCloseJoinDialog = () => {
    setOpenJoinDialog(false);
    setProjectId("");
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    setProjectId("");
    setProjectName("");
    setProjectDescription("");
  };

  const handleJoinProject = () => {
    // Placeholder for joining a project
    setProjects([
      ...projects,
      {
        id: projectId,
        name: `Joined Project ${projectId}`,
        description: "Description for joined project",
        hardware: [
          {
            name: "HWSET 1",
            description: "Raspberry Pi 4, Arduino Uno, and more",
            totalAvailable: 10,
            numberCheckedOut: 2,
          },
          {
            name: "HWSET 2",
            description: "Hard drive and microcontroller",
            totalAvailable: 15,
            numberCheckedOut: 5,
          },
        ],
      },
    ]);
    handleCloseJoinDialog();
  };

  const handleCreateProject = () => {
    // Placeholder for creating a new project
    setProjects([
      ...projects,
      {
        id: projectId,
        name: projectName,
        description: projectDescription,
        hardware: [
          {
            name: "HWSET 1",
            description: "Raspberry Pi 4, Arduino Uno, and more",
            totalAvailable: 10,
            numberCheckedOut: 2,
          },
          {
            name: "HWSET 2",
            description: "Hard drive and microcontroller",
            totalAvailable: 15,
            numberCheckedOut: 5,
          },
        ],
      },
    ]);
    handleCloseCreateDialog();
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
          onClick={handleOpenCreateDialog}
        >
          Create New Project
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginBottom: "20px" }}
          onClick={handleOpenJoinDialog}
        >
          Join Existing Project
        </Button>
        <div>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>

      {/* Join Existing Project Dialog */}
      <Dialog open={openJoinDialog} onClose={handleCloseJoinDialog}>
        <DialogTitle>Join Existing Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the Project ID to join an existing project.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Project ID"
            type="text"
            fullWidth
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJoinDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleJoinProject} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create New Project Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the Project ID, Project Name, and Project Description
            to create a new project.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Project ID"
            type="text"
            fullWidth
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project Description"
            type="text"
            fullWidth
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog} color="primary">
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
