import React, { useState } from "react";
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

export default function ProjectCard({ project }) {
  // const [checkoutRequests, setCheckoutRequests] = useState({});
  // const [checkinRequests, setCheckinRequests] = useState({});

  // const handleCheckoutRequest = (hardwareIndex, value) => {
  //   setCheckoutRequests({ ...checkoutRequests, [hardwareIndex]: value });
  // };

  // const handleCheckinRequest = (hardwareIndex, value) => {
  //   setCheckinRequests({ ...checkinRequests, [hardwareIndex]: value });
  // };

  // const handleCheckout = (hardwareIndex) => {
  //   const hardware = project.hardware[hardwareIndex];
  //   const numberToCheckOut = parseInt(checkoutRequests[hardwareIndex] || 0);
  //   if (
  //     numberToCheckOut > 0 &&
  //     numberToCheckOut <= hardware.totalAvailable - hardware.numberCheckedOut
  //   ) {
  //     hardware.numberCheckedOut += numberToCheckOut;
  //     hardware.totalAvailable -= numberToCheckOut;
  //     setCheckoutRequests({ ...checkoutRequests, [hardwareIndex]: "" });
  //   }
  // };

  // const handleCheckin = (hardwareIndex) => {
  //   const hardware = project.hardware[hardwareIndex];
  //   const numberToCheckIn = parseInt(checkinRequests[hardwareIndex] || 0);
  //   if (numberToCheckIn > 0 && numberToCheckIn <= hardware.numberCheckedOut) {
  //     hardware.numberCheckedOut -= numberToCheckIn;
  //     hardware.totalAvailable += numberToCheckIn;
  //     setCheckinRequests({ ...checkinRequests, [hardwareIndex]: "" });
  //   }
  // };

  console.log(project);

  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h5">{project.project_name}</Typography>
        <Typography variant="body2">{project.description}</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Resource</TableCell>
                <TableCell>Available</TableCell>
                <TableCell>Checked Out</TableCell>
                <TableCell>Check in</TableCell>
                <TableCell>Check out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {project.hardware.map((hardware, hardwareIndex) => (
                <TableRow key={hardwareIndex}>
                  <TableCell>{hardware.item}</TableCell>
                  <TableCell>{hardware.available}</TableCell>
                  <TableCell>{hardware.checked_out}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      // onClick={() => handleCheckin(hardwareIndex)}
                    >
                      Check In
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      // onClick={() => handleCheckout(hardwareIndex)}
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
