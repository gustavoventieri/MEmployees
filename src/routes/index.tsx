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
import { Login } from "../pages/login/Login";
import { ProtectedRoute } from "../shared/services/api/controllers/auth/ProtectedRoutes";
import { AdminsList } from "../pages/admin/AdminsList";
import { AdminCreate } from "../pages/admin/AdminCreate";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  // Informações para a lista do drawer
  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/dashboard",
        label: "Dashboard",
      },
      {
        icon: "person",
        path: "/user",
        label: "Users",
      },
      {
        icon: "admin_panel_settings",
        path: "/admin",
        label: "Admins",
      },
      {
        icon: "business_center",
        path: "/position",
        label: "Positions",
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
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee" element={<EmployeesList />} />
        <Route path="/employee/new" element={<CreateEmployee />} />
        <Route path="/employee/edit/:id" element={<EditEmployee />} />

        <Route path="/position" element={<PositionList />} />
        <Route path="/position/new" element={<CreatePosition />} />
        <Route path="/position/edit/:id" element={<EditPosition />} />

        <Route path="/admin" element={<AdminsList />} />
        <Route path="/admin/new" element={<AdminCreate />} />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};
