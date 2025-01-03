import { useEffect } from "react";
import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/",
        label: "Home Page",
      },
      {
        icon: "star",
        path: "/bata",
        label: "Home Page",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Button variant="contained" color="primary" onClick={toggleTheme}>
            Switch Theme
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
