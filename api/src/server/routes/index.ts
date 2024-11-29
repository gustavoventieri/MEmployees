import { Router } from "express";

import {
  PositionsControler,
  EmployeesControler,
  UsersControler,
} from "../controller";

const router = Router();

// Rotas de Cargos
router.post("/position", PositionsControler.createValidation, PositionsControler.create);


export { router };
