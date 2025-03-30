import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Slider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

function Header() {
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
      </Toolbar>
    </AppBar>
  );
}

export default function Dashboard() {
  const [checkoutRequests, setCheckoutRequests] = useState({});
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const [projectsState, setProjectsState] = useState([
    {
      name: "Project A",
      users: ["user a", "user b", "user c"],
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
    {
      name: "Project B",
      users: ["user a", "user b", "user c"],
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
    {
      name: "Project C",
      users: ["user a", "user b", "user c"],
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

  const handleCheckoutRequest = (projectIndex, hardwareIndex, value) => {
    const key = `${projectIndex}-${hardwareIndex}`;
    setCheckoutRequests({ ...checkoutRequests, [key]: value });
  };

  const handleCheckout = (projectIndex, hardwareIndex) => {
    const key = `${projectIndex}-${hardwareIndex}`;
    const numberToCheckOut = parseInt(checkoutRequests[key] || 0);

    if (numberToCheckOut <= 0) return;

    const updatedProjects = [...projectsState];
    const hardware = updatedProjects[projectIndex].hardware[hardwareIndex];
    const available = hardware.totalAvailable - hardware.numberCheckedOut;

    if (numberToCheckOut <= available) {
      hardware.numberCheckedOut += numberToCheckOut;
      setCheckoutRequests({ ...checkoutRequests, [key]: "" });
      setProjectsState(updatedProjects); // updates UI
    } else {
      alert("Not enough hardware available to check out.");
    }
  };

  const handleOpenJoinDialog = () => setOpenJoinDialog(true);
  const handleCloseJoinDialog = () => {
    setOpenJoinDialog(false);
    setProjectId("");
  };

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    setProjectId("");
    setProjectName("");
    setProjectDescription("");
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
        {projectsState.map((project, projectIndex) => (
          <div key={projectIndex} style={{ marginBottom: "40px" }}>
            <Typography variant="h5" gutterBottom>
              {project.name}
            </Typography>
            <Typography variant="h6">Authorized Users</Typography>
            <List>
              {project.users.map((user, index) => (
                <ListItem key={index}>
                  <ListItemText primary={user} />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6">Hardware Components</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Hardware Name</TableCell>
                    <TableCell>Hardware Description</TableCell>
                    <TableCell>Total Available</TableCell>
                    <TableCell>Number Checked Out</TableCell>
                    <TableCell>Request to Check Out</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {project.hardware.map((hardware, hardwareIndex) => (
                    <TableRow key={hardwareIndex}>
                      <TableCell>{hardware.name}</TableCell>
                      <TableCell>{hardware.description}</TableCell>
                      <TableCell>{hardware.totalAvailable}</TableCell>
                      <TableCell>{hardware.numberCheckedOut}</TableCell>
                      <TableCell>
                        <Slider
                          value={
                            checkoutRequests[
                              `${projectIndex}-${hardwareIndex}`
                            ] || 0
                          }
                          onChange={(e, value) =>
                            handleCheckoutRequest(
                              projectIndex,
                              hardwareIndex,
                              value,
                            )
                          }
                          aria-labelledby="continuous-slider"
                          min={0}
                          max={
                            hardware.totalAvailable - hardware.numberCheckedOut
                          }
                          valueLabelDisplay="auto"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleCheckout(projectIndex, hardwareIndex)
                          }
                        >
                          Check Out
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </Container>

      {/* Join Dialog */}
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
          <Button onClick={handleCloseJoinDialog} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
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
          <Button onClick={handleCloseCreateDialog} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
