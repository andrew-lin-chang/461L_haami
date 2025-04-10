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
  Slider,
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
          variant="contained"
          color="secondary"
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

export default function ProjectCard({ project }) {
  console.log(project);

  return (
    <Card style={{ marginBottom: "20px" }}>
      <Typography align="left" sx={{ padding: "10px 10px" }} variant="h5">
        {project.project_name}
      </Typography>
      <Typography
        align="left"
        sx={{ padding: "5px 10px", color: "gray" }}
        variant="body2"
      >
        {project.description}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Resource</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Checked Out</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Check in</TableCell>
              <TableCell>Check out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {project.hardware.map((hardware, hardwareIndex) => (
              <HardwareRow key={hardwareIndex} hardware={hardware} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
