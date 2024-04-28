import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CargosControllers } from "../controllers";
const router = Router();

router.get(
  "/cargos",
  CargosControllers.getAllValidation,
  CargosControllers.getAll
);
router.post(
  "/cargos",
  CargosControllers.createValidation,
  CargosControllers.create
);
router.get(
  "/cargos/:id",
  CargosControllers.getByIdValidation,
  CargosControllers.getById
);
router.put(
  "/cargos/:id",
  CargosControllers.updateByIdValidation,
  CargosControllers.updateById
);
router.delete(
  "/cargos/:id",
  CargosControllers.deleteByIdValidation,
  CargosControllers.deleteById
);
export { router };
