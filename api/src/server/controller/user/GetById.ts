import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { UserProvider } from "../../database/providers/user";

interface IParamProps {
  id?: number;
}

// Validação para o body da requisação
export const getUserByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
}));

// Controller que pesquisa um user por ID
export const getUserById = async (
  req: Request<IParamProps>,
  res: Response
) => {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
    return;
  }

  const result = await UserProvider.getById(req.params.id);
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return;
  }

  res.status(StatusCodes.OK).json(result);
  return;
};
