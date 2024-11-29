import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
interface IPosition {
  name: string;
}

// Validação para o body da requisação
export const createValidation = validation((getSchema) => ({
  body: getSchema<IPosition>(
    yup.object().shape({
      name: yup.string().required().max(150).min(3),
    })
  ),
}));

// Controller que cria um cargo
export const create = (req: Request<{}, {}, IPosition>, res: Response) => {
  res.send("created");
  return;
};
