import React, { useEffect, useState } from "react";
import { Container, Typography, AppBar, Toolbar, Button } from "@mui/material";
import ProjectCard from "./ProjectCard";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [hardwareSets, setHardwareSets] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));

    fetch("/api/hardware")
      .then((res) => res.json())
      .then((data) => setHardwareSets(data));
  }, []);

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
