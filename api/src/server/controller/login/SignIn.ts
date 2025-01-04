import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UserProvider } from "../../database/providers/user";
import { validation } from "../../shared/middlewares";
import { IUser } from "../../database/models";
import { JWTService, PasswordServices } from "../../shared/services";
import { AdminProvider } from "../../database/providers/admin";

interface IBodyProps extends Omit<IUser, "id" | "name"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      password: yup.string().required().min(6),
      email: yup.string().required().email().min(5),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, password } = req.body;

  // Tenta buscar o usuário
  const user = await UserProvider.getByEmail(email);

  // Se o usuário não for encontrado, tenta buscar o administrador
  if (user instanceof Error) {
    const admin = await AdminProvider.getByEmail(email);

    if (admin instanceof Error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
          default: "Email ou senha são inválidos",
        },
      });
      return;
    }

    // Se for encontrado um administrador, verifica a senha
    const passwordMatchAdmin = await PasswordServices.verifypassword(
      password,
      admin.password
    );

    if (!passwordMatchAdmin) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
          default: "Email ou senha são inválidos",
        },
      });
      return;
    }

    // Gera o token para o administrador
    const accessTokenAdmin = JWTService.sign({ uid: admin.id });
    if (accessTokenAdmin === "JWT_SECRET_NOT_FOUND") {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar o token de acesso",
        },
      });
      return;
    }

    res.status(StatusCodes.OK).json({ accessToken: accessTokenAdmin });
    return;
  }

  // Se o usuário foi encontrado, verifica a senha
  const passwordMatchUser = await PasswordServices.verifypassword(
    password,
    user.password
  );
  if (!passwordMatchUser) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
    return;
  }

  // Gera o token para o usuário
  const accessTokenUser = JWTService.sign({ uid: user.id });
  if (accessTokenUser === "JWT_SECRET_NOT_FOUND") {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro ao gerar o token de acesso",
      },
    });
    return;
  }

  res.status(StatusCodes.OK).json({ accessToken: accessTokenUser });
  return;
};
