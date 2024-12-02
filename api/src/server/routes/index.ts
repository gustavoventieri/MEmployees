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

export { router };
