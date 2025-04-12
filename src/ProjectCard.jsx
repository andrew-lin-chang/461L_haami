import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material";

function HardwareRow({ hardware }) {
  const [available, setAvailable] = useState(parseInt(hardware.available));
  const [checkedOut, setCheckedOut] = useState(parseInt(hardware.checked_out));
  const [quantity, setQuantity] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();

  const handleCheckin = async () => {
    const response = await fetch(`${apiUrl}/hardware/checkin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: user.userid,
        item: hardware.item,
        quantity: quantity,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setAvailable(available + parseInt(quantity));
      setCheckedOut(checkedOut - parseInt(quantity));
      alert(data.message);
    } else {
      alert(data.message);
      console.error(data);
    }
  };

  const handleCheckout = async () => {
    const response = await fetch(`${apiUrl}/hardware/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: user.userid,
        item: hardware.item,
        quantity: quantity,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setAvailable(available - parseInt(quantity));
      setCheckedOut(checkedOut + parseInt(quantity));
      alert(data.message);
    } else {
      alert(data.message);
      console.error(data);
    }
  };

  return (
    <TableRow>
      <TableCell>{hardware.item}</TableCell>
      <TableCell>{available}</TableCell>
      <TableCell>{checkedOut}</TableCell>
      <TableCell>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ width: "50px" }}
          min="0"
          max={hardware.available}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCheckin}
          disabled={quantity > checkedOut}
        >
          Check In
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          disabled={quantity > available}
        >
          Check Out
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default function ProjectCard({ project, onRemove }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();

  const handleLeaveProject = async () => {
    try {
      const response = await fetch(`${apiUrl}/projects/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: user.userid, // User ID from AuthContext
          project_id: project.project_id, // Project ID from the card
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onRemove(project.project_id); // Remove the project from the UI
      } else {
        alert(data.message); // Notify the user of failure
        console.error(data);
      }
    } catch (error) {
      console.error("Error leaving project:", error);
      alert("An error occurred while trying to leave the project.");
    }
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography align="left" sx={{ padding: "10px 10px" }} variant="h5">
          {project.project_name}
        </Typography>
        <Typography
          align="right"
          sx={{ padding: "10px 10px", color: "gray" }}
          variant="body1"
        >
          ID: {project.project_id}
        </Typography>
      </Box>
      <Typography
        align="left"
        sx={{ padding: "0px 10px", color: "black", marginBottom: "10px" }}
        variant="body2"
      >
        {project.description}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "gray" }}>Resource</TableCell>
              <TableCell sx={{ color: "gray" }}>Available</TableCell>
              <TableCell sx={{ color: "gray" }}>Checked Out</TableCell>
              <TableCell sx={{ color: "gray" }}>Quantity</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {project.hardware.map((hardware, hardwareIndex) => (
              <HardwareRow key={hardwareIndex} hardware={hardware} />
            ))}
          </TableBody>
        </Table>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
        >
          <Button color="error" onClick={handleLeaveProject}>
            Leave Project
          </Button>
        </Box>
      </TableContainer>
    </Card>
  );
}
