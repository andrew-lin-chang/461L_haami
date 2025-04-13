import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Box,
  TableBody,
} from "@mui/material";

function CheckoutRow({ checkout }) {
  return (
    <TableRow>
      <TableCell>{checkout.user}</TableCell>
      <TableCell>{checkout.hardware}</TableCell>
      <TableCell>{checkout.quantity}</TableCell>
    </TableRow>
  );
}

export default function CheckoutCard({ refresh }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [checkouts, setCheckouts] = useState([]);

  const fetchCheckouts = async () => {
    const response = await fetch(`${apiUrl}/checkouts`);
    const data = await response.json();
    if (response.ok) {
      setCheckouts(data);
    } else {
      console.error("Error fetching checkouts:", data);
    }
  };

  useEffect(() => {
    fetchCheckouts();
  }, [refresh]);

  return (
    <div>
      <Box sx={{ padding: "16px 0" }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
          Checkouts
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "gray" }}>User ID</TableCell>
            <TableCell sx={{ color: "gray" }}>Resource</TableCell>
            <TableCell sx={{ color: "gray" }}>Quantity</TableCell>
          </TableRow>
        </TableHead>
        {checkouts.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} align="center">
                Nothing checked out
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {checkouts.map((checkout, checkoutIndex) => (
              <CheckoutRow key={checkoutIndex} checkout={checkout} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
