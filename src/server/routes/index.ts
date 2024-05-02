import { Router } from "express";
import { CargosControllers, FuncionariosControllers } from "../controllers";
const router = Router();

// Rotas de Cargos
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

// Rotas de Funcionários
router.get(
  "/funcionarios",
  FuncionariosControllers.getAllValidation,
  FuncionariosControllers.getAll
);
router.post(
  "/funcionarios",
  FuncionariosControllers.createValidation,
  FuncionariosControllers.create
);
router.get(
  "/funcionarios/:id",
  FuncionariosControllers.getByIdValidation,
  FuncionariosControllers.getById
);
router.put(
  "/funcionarios/:id",
  FuncionariosControllers.updateByIdValidation,
  FuncionariosControllers.updateById
);
router.delete(
  "/funcionarios/:id",
  FuncionariosControllers.deleteByIdValidation,
  FuncionariosControllers.deleteById
);
export { router };
