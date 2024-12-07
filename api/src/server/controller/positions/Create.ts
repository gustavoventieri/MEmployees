import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
interface IBodyProps {
  name: string;
}

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
  console.log(req.body);

  res.status(StatusCodes.CREATED).json(1);
};
