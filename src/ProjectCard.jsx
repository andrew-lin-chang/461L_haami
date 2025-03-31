import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Slider,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function ProjectCard({ project, hardwareSets }) {
  const [checkoutRequests, setCheckoutRequests] = useState({});
  const [checkinRequests, setCheckinRequests] = useState({});
  const [localHardwareSets, setLocalHardwareSets] = useState(hardwareSets);

  const handleSliderChange = (type, name, value) => {
    if (type === "out") {
      setCheckoutRequests({ ...checkoutRequests, [name]: value });
    } else {
      setCheckinRequests({ ...checkinRequests, [name]: value });
    }
  };

  const handleCheckout = (name) => {
    const amount = checkoutRequests[name] || 0;
    setLocalHardwareSets((prev) =>
      prev.map((hw) =>
        hw.name === name
          ? {
              ...hw,
              numberCheckedOut: hw.numberCheckedOut + amount,
              totalAvailable: hw.totalAvailable - amount,
            }
          : hw,
      ),
    );
    setCheckoutRequests({ ...checkoutRequests, [name]: 0 });

    // TODO: Replace with backend call
    // fetch("/api/checkout", { method: "POST", body: JSON.stringify({ name, amount }) });
  };

  const handleCheckin = (name) => {
    const amount = checkinRequests[name] || 0;
    setLocalHardwareSets((prev) =>
      prev.map((hw) =>
        hw.name === name
          ? {
              ...hw,
              numberCheckedOut: hw.numberCheckedOut - amount,
              totalAvailable: hw.totalAvailable + amount,
            }
          : hw,
      ),
    );
    setCheckinRequests({ ...checkinRequests, [name]: 0 });

    // TODO: Replace with backend call
    // fetch("/api/checkin", { method: "POST", body: JSON.stringify({ name, amount }) });
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h6">{project.name}</Typography>

        <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
          Authorized Users
        </Typography>
        <List>
          {project.users.map((user, index) => (
            <ListItem key={index}>
              <ListItemText primary={user} />
            </ListItem>
          ))}
        </List>

        <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
          Hardware Components (Shared)
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hardware Set</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Total Available</TableCell>
              <TableCell>Checked Out</TableCell>
              <TableCell>Request to Check Out</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Request to Check In</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localHardwareSets.map((hw, index) => (
              <TableRow key={index}>
                <TableCell>{hw.name}</TableCell>
                <TableCell>{hw.description}</TableCell>
                <TableCell>{hw.totalAvailable}</TableCell>
                <TableCell>{hw.numberCheckedOut}</TableCell>
                <TableCell>
                  <Slider
                    value={checkoutRequests[hw.name] || 0}
                    min={0}
                    max={hw.totalAvailable}
                    onChange={(e, value) =>
                      handleSliderChange("out", hw.name, value)
                    }
                    valueLabelDisplay="auto"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleCheckout(hw.name)}
                  >
                    Check Out
                  </Button>
                </TableCell>
                <TableCell>
                  <Slider
                    value={checkinRequests[hw.name] || 0}
                    min={0}
                    max={hw.numberCheckedOut}
                    onChange={(e, value) =>
                      handleSliderChange("in", hw.name, value)
                    }
                    valueLabelDisplay="auto"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCheckin(hw.name)}
                  >
                    Check In
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
