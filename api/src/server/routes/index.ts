import { Router } from "express";

import {
  PositionsControler,
  EmployeesControler,
  UsersControler,
} from "../controller";
import { isAuthenticated } from "../shared/middlewares";

const router = Router();

// Rotas de Padrão
router.get("/", (_, res) => {
  res.send("Olá, DEV!");
  return;
});

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
router.post("/signin", UsersControler.signInValidation, UsersControler.signIn);
router.post("/signup", UsersControler.signUpValidation, UsersControler.signUp);

export { router };
