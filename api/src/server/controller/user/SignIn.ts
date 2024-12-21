import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UserProvider } from "../../database/providers/user";
import { validation } from "../../shared/middlewares";
import { IUser } from "../../database/models";
import { JWTService, PasswordServices } from "../../shared/services";

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

  const user = await UserProvider.getByEmail(email);
  if (user instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
    return;
  }

  const passwordMatch = await PasswordServices.verifypassword(
    password,
    user.password
  );

  if (!passwordMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
    return;
  } else {
    const accessToken = JWTService.sign({ uid: user.id });
    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar o token de acesso",
        },
      });
      return;
    }
    res.status(StatusCodes.OK).json({ accessToken });
    return;
  }
};
