import React, { useState } from "react";
import { Container, Typography, AppBar, Toolbar, Button } from "@mui/material";
import ProjectCard from "./ProjectCard";

export default function Dashboard() {
  const [projects] = useState([
    {
      name: "new project",
      users: ["user a", "user b"],
    },
    {
      name: "test project",
      users: ["user c", "user d"],
    },
  ]);

  const [hardwareSets] = useState([
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
  ]);

  return (
    <div>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            haami
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "100px" }}>
        <Typography variant="h4" gutterBottom>
          XYZ User's Projects
        </Typography>

        <Button
          variant="contained"
          color="warning"
          style={{ marginRight: "10px" }}
        >
          CREATE NEW PROJECT
        </Button>
        <Button variant="contained" color="secondary">
          JOIN EXISTING PROJECT
        </Button>

        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            hardwareSets={hardwareSets}
          />
        ))}
      </Container>
    </div>
  );
}
