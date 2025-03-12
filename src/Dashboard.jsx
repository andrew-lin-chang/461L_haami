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
  TextField,
  Button,
  Slider,
  List,
  ListItem,
  ListItemText,
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

  const projects = [
    {
      name: "Project A",
      users: ["user a", "user b", "user c"],
      hardware: [
        {
          name: "Raspberry Pi",
          description: "A small single-board computer",
          totalAvailable: 10,
          numberCheckedOut: 2,
        },
        {
          name: "Arduino",
          description: "An open-source electronics platform",
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
          name: "Raspberry Pi",
          description: "A small single-board computer",
          totalAvailable: 10,
          numberCheckedOut: 2,
        },
        {
          name: "Hard Drive",
          description: "Physical device that stores digital data",
          totalAvailable: 20,
          numberCheckedOut: 8,
        },
      ],
    },
    {
      name: "Project C",
      users: ["user a", "user b", "user c"],
      hardware: [
        {
          name: "Arduino",
          description: "An open-source electronics platform",
          totalAvailable: 15,
          numberCheckedOut: 5,
        },
        {
          name: "Microcontroller",
          description:
            "A compact integrated circuit designed to govern a specific operation in an embedded system",
          totalAvailable: 25,
          numberCheckedOut: 10,
        },
      ],
    },
  ];

  const handleCheckoutRequest = (projectIndex, hardwareIndex, value) => {
    const key = `${projectIndex}-${hardwareIndex}`;
    setCheckoutRequests({ ...checkoutRequests, [key]: value });
  };

  const handleCheckout = (projectIndex, hardwareIndex) => {
    const key = `${projectIndex}-${hardwareIndex}`;
    const project = projects[projectIndex];
    const hardware = project.hardware[hardwareIndex];
    const numberToCheckOut = parseInt(checkoutRequests[key] || 0);
    if (
      numberToCheckOut > 0 &&
      numberToCheckOut <= hardware.totalAvailable - hardware.numberCheckedOut
    ) {
      hardware.numberCheckedOut += numberToCheckOut;
      setCheckoutRequests({ ...checkoutRequests, [key]: "" });
    }
  };

  return (
    <div>
      <Header />
      <Container style={{ marginTop: "80px" }}>
        <Typography variant="h4" gutterBottom>
          Checkout Dashboard
        </Typography>
        {projects.map((project, projectIndex) => (
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
    </div>
  );
}
