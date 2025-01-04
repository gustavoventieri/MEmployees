import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { Dashboard } from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  // Informações para a lista do drawer
  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/",
        label: "Home Page",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
