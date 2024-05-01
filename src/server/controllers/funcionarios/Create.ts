import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { ICargo } from "../../database/models";
import { CargoProviders } from "../../database/providers/cargos";

interface IBodyProps extends Omit<ICargo, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().max(150).min(3),
    })
  ),
}));

export const create = async (req: Request<{}, {}, ICargo>, res: Response) => {
  const result = await CargoProviders.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
