import { createTheme } from "@mui/material";
import { blue, cyan } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      dark: blue[800],
      light: blue[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: "#ffffff",
    },
    background: {
      paper: "#303134",
      default: "#202124",
    },
    text: {
      primary: "#ffffff", // Cor do texto principal (pode ser alterada aqui)
    },
    action: {
      active: "#fffff", // Cor dos ícones quando estão ativos (ou em hover)
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});
