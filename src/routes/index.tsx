import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthContext, useDrawerContext } from "../shared/contexts";
import {
  CreatePosition,
  Dashboard,
  EditEmployee,
  EmployeesList,
  PositionList,
  AdminCreate,
  AdminsList,
  EditPosition,
  CreateEmployee,
  Login,
  UsersList,
  CreateUser,
} from "../pages";

import { ProtectedRoute } from "../shared/services/api/controllers/auth/ProtectedRoutes";
import EditUser from "../pages/Users/UserEdit";
import { Settings } from "../pages/Employee/Settings/Settings";
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

        <Route path="/user" element={<UsersList />} />
        <Route path="/user/new" element={<CreateUser />} />
        <Route path="/user/edit/:id" element={<EditUser />} />

        <Route path="/admin" element={<AdminsList />} />
        <Route path="/admin/new" element={<AdminCreate />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};
