import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IFuncionario } from "../../database/models";
import { FuncionariosProviders } from "../../database/providers/funcionarios";

interface IBodyProps extends Omit<IFuncionario, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nomeCompleto: yup.string().required().min(3),
      email: yup.string().required().email(),
      cargoid: yup.number().required(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IFuncionario>,
  res: Response
) => {
  const result = await FuncionariosProviders.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
