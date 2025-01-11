import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthContext, useDrawerContext } from "../shared/contexts";
import {
  CreatePosition,
  Dashboard,
  EditEmployee,
  EmployeesList,
  PositionList,
} from "../pages";
import { CreateEmployee } from "../pages/Employee/CreateEmployee";
import EditPosition from "../pages/Position/EditPosition";
import { Login } from "../pages/Login/Login";
import { ProtectedRoute } from "../shared/services/api/controllers/auth/ProtectedRoutes";
import { AdminsList } from "../pages/Admin/AdminsList";
import { AdminCreate } from "../pages/Admin/AdminCreate";
import { Login2 } from "../pages/Settings/Settings";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  const { isAuthenticated } = useAuthContext();

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
      {(!isAuthenticated && <Route path="/" element={<Login />} />) ||
        (isAuthenticated && <Route path="/" element={<Dashboard />} />)}

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

        <Route path="/settings" element={<Login2 />} />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};
