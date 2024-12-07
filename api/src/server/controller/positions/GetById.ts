import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
  id?: number;
}

// Validação para o body da requisação
export const getPositionByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
}));

// Controller que pesquisa um cargo por ID
export const getPositionById = async (
  req: Request<IParamProps>,
  res: Response
) => {
  if (Number(req.params.id) === 99999) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Registro não encontrado",
      },
    });
    return;
  }
  res.status(StatusCodes.OK).json({
    id: req.params.id,
    name: "Dev Junior",
  });
};
