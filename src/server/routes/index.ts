import { Router } from "express";
import {
  CargosControllers,
  FuncionariosControllers,
  UsuarioControllers,
} from "../controllers";
import { ensureAuthenticated } from "../shared/middlewares";
const router = Router();

// Rotas de Cargos
router.get(
  "/cargos",
  ensureAuthenticated,
  CargosControllers.getAllValidation,
  CargosControllers.getAll
);
router.post(
  "/cargos",
  ensureAuthenticated,
  CargosControllers.createValidation,
  CargosControllers.create
);
router.get(
  "/cargos/:id",
  ensureAuthenticated,
  CargosControllers.getByIdValidation,
  CargosControllers.getById
);
router.put(
  "/cargos/:id",
  ensureAuthenticated,
  CargosControllers.updateByIdValidation,
  CargosControllers.updateById
);
router.delete(
  "/cargos/:id",
  ensureAuthenticated,
  CargosControllers.deleteByIdValidation,
  CargosControllers.deleteById
);

// Rotas de Funcionários
router.get(
  "/funcionarios",
  ensureAuthenticated,
  FuncionariosControllers.getAllValidation,
  FuncionariosControllers.getAll
);
router.post(
  "/funcionarios",
  ensureAuthenticated,
  FuncionariosControllers.createValidation,
  FuncionariosControllers.create
);
router.get(
  "/funcionarios/:id",
  ensureAuthenticated,
  FuncionariosControllers.getByIdValidation,
  FuncionariosControllers.getById
);
router.put(
  "/funcionarios/:id",
  ensureAuthenticated,
  FuncionariosControllers.updateByIdValidation,
  FuncionariosControllers.updateById
);
router.delete(
  "/funcionarios/:id",
  ensureAuthenticated,
  FuncionariosControllers.deleteByIdValidation,
  FuncionariosControllers.deleteById
);

router.post(
  "/entrar",
  UsuarioControllers.signInValidation,
  UsuarioControllers.signIn
);
router.post(
  "/cadastrar",
  UsuarioControllers.signUpValidation,
  UsuarioControllers.signUp
);

export { router };
