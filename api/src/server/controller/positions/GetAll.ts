import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

// Validação para o body da requisação
export const getAllPositionValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));

// Controller que pesquisa todos os cargos
export const getAllPosition = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", 1);

  res.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: "Caxias do Sul",
    },
  ]);
};
