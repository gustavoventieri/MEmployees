import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CargosControllers } from "../controllers";
const router = Router();

router.get(
  "/cidades",
  CargosControllers.getAllValidation,
  CargosControllers.getAll
);
router.post(
  "/cidades",
  CargosControllers.createValidation,
  CargosControllers.create
);
router.get(
  "/cidades/:id",
  CargosControllers.getByIdValidation,
  CargosControllers.getById
);
router.put(
  "/cidades/:id",
  CargosControllers.updateByIdValidation,
  CargosControllers.updateById
);
router.delete(
  "/cidades/:id",
  CargosControllers.deleteByIdValidation,
  CargosControllers.deleteById
);
export { router };
