import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { UserProvider } from "../../database/providers/user";
import { AdminProvider } from "../../database/providers/admin";

interface IParamProps {
  id?: number;
}

// Validação para o body da requisação
export const getAdminByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
}));

// Controller que pesquisa um admin por ID
export const getAdminById = async (
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

  const result = await AdminProvider.getById(req.params.id);
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
