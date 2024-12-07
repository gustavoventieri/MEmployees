import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IPosition } from "../../database/models";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IPosition, "id"> {}

// Validação para o body da requisação
export const updatePositionByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().max(150).min(3),
    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
}));

// Controller que atualiza um cargo
export const updatePositionById = async (
  req: Request<IParamProps, {}, IBodyProps>,
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
  res.status(StatusCodes.NO_CONTENT).send();
};
