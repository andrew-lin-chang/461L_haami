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

  const hardwareList = [
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
    {
      name: "Hard Drive",
      description: "Physical device that stores digital data",
      totalAvailable: 20,
      numberCheckedOut: 8,
    },
  ];

  const handleCheckoutRequest = (index, value) => {
    setCheckoutRequests({ ...checkoutRequests, [index]: value });
  };

  const handleCheckout = (index) => {
    const hardware = hardwareList[index];
    const numberToCheckOut = parseInt(checkoutRequests[index] || 0);
    if (
      numberToCheckOut > 0 &&
      numberToCheckOut <= hardware.totalAvailable - hardware.numberCheckedOut
    ) {
      hardwareList[index].numberCheckedOut += numberToCheckOut;
      setCheckoutRequests({ ...checkoutRequests, [index]: "" });
    }
  };

  return (
    <div>
      <Header />
      <Container style={{ marginTop: "80px" }}>
        <Typography variant="h4" gutterBottom>
          Checkout Dashboard
        </Typography>
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
              {hardwareList.map((hardware, index) => (
                <TableRow key={index}>
                  <TableCell>{hardware.name}</TableCell>
                  <TableCell>{hardware.description}</TableCell>
                  <TableCell>{hardware.totalAvailable}</TableCell>
                  <TableCell>{hardware.numberCheckedOut}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={checkoutRequests[index] || ""}
                      onChange={(e) =>
                        handleCheckoutRequest(index, e.target.value)
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCheckout(index)}
                    >
                      Check Out
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
