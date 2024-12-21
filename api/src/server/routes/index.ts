import { Router } from "express";

import {
  PositionsControler,
  EmployeesControler,
  UsersControler,
} from "../controller";

const router = Router();

// Rotas de Cargos
router.post(
  "/position",
  PositionsControler.createPositionValidation,
  PositionsControler.createPosition
);

router.get(
  "/position",
  PositionsControler.getAllPositionValidation,
  PositionsControler.getAllPosition
);

router.get(
  "/position/:id",
  PositionsControler.getPositionByIdValidation,
  PositionsControler.getPositionById
);

router.put(
  "/position/:id",
  PositionsControler.updatePositionByIdValidation,
  PositionsControler.updatePositionById
);

router.delete(
  "/position/:id",
  PositionsControler.deletePositionByIdValidation,
  PositionsControler.deletePositionById
);

// Rotas de Funcionario

router.get(
  "/employee",
  EmployeesControler.getAllEmployeesValidation,
  EmployeesControler.getAllEmployees
);
router.post(
  "/employee",
  EmployeesControler.createEmployeeValidation,
  EmployeesControler.createEmployee
);
router.get(
  "/employee/:id",
  EmployeesControler.getEmployeeByIdValidation,
  EmployeesControler.getEmployeeById
);
router.put(
  "/employee/:id",
  EmployeesControler.updateEmployeeByIdValidation,
  EmployeesControler.updateEmployeeById
);
router.delete(
  "/employee/:id",
  EmployeesControler.deleteEmployeeByIdValidation,
  EmployeesControler.deleteEmployeeById
);

// Rotas de Usuario
router.post("/signin", UsersControler.signInValidation, UsersControler.signIn);
router.post("/signup", UsersControler.signUpValidation, UsersControler.signUp);

export { router };
