import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Slider,
} from "@mui/material";

export default function ProjectCard({ project }) {
  const [checkoutRequests, setCheckoutRequests] = useState({});

  const handleCheckoutRequest = (hardwareIndex, value) => {
    setCheckoutRequests({ ...checkoutRequests, [hardwareIndex]: value });
  };

  const handleCheckout = (hardwareIndex) => {
    const hardware = project.hardware[hardwareIndex];
    const numberToCheckOut = parseInt(checkoutRequests[hardwareIndex] || 0);
    if (
      numberToCheckOut > 0 &&
      numberToCheckOut <= hardware.totalAvailable - hardware.numberCheckedOut
    ) {
      hardware.numberCheckedOut += numberToCheckOut;
      hardware.totalAvailable -= numberToCheckOut;
      setCheckoutRequests({ ...checkoutRequests, [hardwareIndex]: "" });
    }
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h5">{project.name}</Typography>
        <Typography variant="body2">{project.description}</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hardware Sets</TableCell>
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
                      value={checkoutRequests[hardwareIndex] || 0}
                      onChange={(e, value) =>
                        handleCheckoutRequest(hardwareIndex, value)
                      }
                      aria-labelledby="continuous-slider"
                      min={0}
                      max={hardware.totalAvailable - hardware.numberCheckedOut}
                      valueLabelDisplay="auto"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCheckout(hardwareIndex)}
                    >
                      Check Out
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
