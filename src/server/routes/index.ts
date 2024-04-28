import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CargosControllers } from "../controllers";
const router = Router();

router.post(
  "/cargos",
  CargosControllers.createValidation,
  CargosControllers.create
);

export { router };
