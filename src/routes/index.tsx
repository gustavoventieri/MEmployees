import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { Dashboard, EditEmployee, PositionList } from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  // Informações para a lista do drawer
  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Home",
      },
      {
        icon: "people",
        path: "/employee",
        label: "Employees",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/employee" element={<PositionList />} />
      <Route path="/employee/new" element={<EditEmployee />} />
      <Route path="/employee/edit/:id" element={<EditEmployee />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
