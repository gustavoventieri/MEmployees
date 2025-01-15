import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface AlertBoxProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: "success" | "info" | "warning" | "error"; // Tipo de alerta, o padrão será 'error'
}

export const AlertBox: React.FC<AlertBoxProps> = ({
  open,
  onClose,
  message,
  severity = "error",
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Centraliza o Snackbar
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%", // Largura personalizada
          fontSize: "1rem",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
