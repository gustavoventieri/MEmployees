import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import {
  CreatePosition,
  Dashboard,
  EditEmployee,
  EmployeesList,
  PositionList,
} from "../pages";
import { CreateEmployee } from "../pages/employee/CreateEmployee";
import EditPosition from "../pages/position/EditPosition";

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
      {
        icon: "business_center",
        path: "/position",
        label: "Positions",
      },
      {
        icon: "people",
        path: "/position",
        label: "Admin",
      },
      {
        icon: "people",
        path: "/position",
        label: "User",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/employee" element={<EmployeesList />} />
      <Route path="/employee/new" element={<CreateEmployee />} />
      <Route path="/employee/edit/:id" element={<EditEmployee />} />

      <Route path="/position" element={<PositionList />} />
      <Route path="/position/new" element={<CreatePosition />} />
      <Route path="/position/edit/:id" element={<EditPosition />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
