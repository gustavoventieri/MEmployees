import { Router } from "express";

import {
  PositionsControler,
  EmployeesControler,
  UsersControler,
} from "../controller";
import { isAuthenticated } from "../shared/middlewares";
import { LoginController } from "../controller/login";
import { AdminControllers } from "../controller/admin";

const router = Router();

// Rotas de Login
router.post(
  "/signin",
  LoginController.signInValidation,
  LoginController.signIn
);

// Rotas de Cargos
router.post(
  "/position",
  isAuthenticated,
  PositionsControler.createPositionValidation,
  PositionsControler.createPosition
);

router.get(
  "/position",
  isAuthenticated,
  PositionsControler.getAllPositionValidation,
  PositionsControler.getAllPosition
);

router.get(
  "/position/:id",
  isAuthenticated,
  PositionsControler.getPositionByIdValidation,
  PositionsControler.getPositionById
);

router.put(
  "/position/:id",
  isAuthenticated,
  PositionsControler.updatePositionByIdValidation,
  PositionsControler.updatePositionById
);

router.delete(
  "/position/:id",
  isAuthenticated,
  PositionsControler.deletePositionByIdValidation,
  PositionsControler.deletePositionById
);

// Rotas de Funcionario

router.get(
  "/employee",
  isAuthenticated,
  EmployeesControler.getAllEmployeesValidation,
  EmployeesControler.getAllEmployees
);
router.post(
  "/employee",
  isAuthenticated,
  EmployeesControler.createEmployeeValidation,
  EmployeesControler.createEmployee
);
router.get(
  "/employee/:id",
  isAuthenticated,
  EmployeesControler.getEmployeeByIdValidation,
  EmployeesControler.getEmployeeById
);
router.put(
  "/employee/:id",
  isAuthenticated,
  EmployeesControler.updateEmployeeByIdValidation,
  EmployeesControler.updateEmployeeById
);
router.delete(
  "/employee/:id",
  isAuthenticated,
  EmployeesControler.deleteEmployeeByIdValidation,
  EmployeesControler.deleteEmployeeById
);

// Rotas de Usuario
router.post(
  "/user",
  isAuthenticated,
  UsersControler.signUpValidation,
  UsersControler.signUp
);
router.delete(
  "/user/:id",
  isAuthenticated,
  UsersControler.deleteUserByIdValidation,
  UsersControler.deleteUserById
);
router.get(
  "/user",
  isAuthenticated,
  UsersControler.getAllUsersValidation,
  UsersControler.getAllUsers
);
router.get(
  "/user/:id",
  isAuthenticated,
  UsersControler.getUserByIdValidation,
  UsersControler.getUserById
);
router.put(
  "/user/:id",
  isAuthenticated,
  UsersControler.updateUserByIdValidation,
  UsersControler.updateUserById
);

// Rotas de Admin
router.post(
  "/admin",
  isAuthenticated,
  AdminControllers.signUpValidation,
  AdminControllers.signUp
);
router.get(
  "/admin",
  isAuthenticated,
  AdminControllers.getAllAdminsValidation,
  AdminControllers.getAllAdmins
);
router.get(
  "/admin/:id",
  isAuthenticated,
  AdminControllers.getAdminByIdValidation,
  AdminControllers.getAdminById
);
router.delete(
  "/admin/:id",
  isAuthenticated,
  AdminControllers.deleteAdminByIdValidation,
  AdminControllers.deleteAdminById
);
router.put(
  "/admin/:id",
  isAuthenticated,
  AdminControllers.updateAdminByIdValidation,
  AdminControllers.updateAdminById
);

export { router };
