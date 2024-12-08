import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { Knex } from "../../database/knex";
import { IPosition } from "../../database/models";
import { PositionsProviders } from "../../database/providers/position";
interface IBodyProps extends Omit<IPosition, "id"> {}

// Validação para o body da requisação
export const createPositionValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().max(150).min(3),
    })
  ),
}));

// Controller que cria um cargo
export const createPosition = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await PositionsProviders.create(req.body);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return;
  }
  res.status(StatusCodes.CREATED).json(result);
  return;
};
