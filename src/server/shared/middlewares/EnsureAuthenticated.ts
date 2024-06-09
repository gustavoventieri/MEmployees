import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: { default: "Não autenticado" } });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: { default: "Não autenticado" } });
  }

  const jwtData = JWTService.verify(token);
  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: { default: "Erro ao verificar o erro" } });
  } else if (jwtData === "INVALID_TOKEN") {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: { default: "Não autenticado" } });
  }

  req.headers.idUsuario = jwtData.uid.toString();

  return next();
};
