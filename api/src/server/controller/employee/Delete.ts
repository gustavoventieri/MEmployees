import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { EmployeesProviders } from "../../database/providers/employee";
import { validation } from "../../shared/middlewares";

interface IParamProps {
  id?: number;
}
export const deleteEmployeeByIdValidation = validation((get) => ({
  params: get<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const deleteEmployeeById = async (
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

  const result = await EmployeesProviders.deleteById(req.params.id);
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return;
  }

  res.status(StatusCodes.NO_CONTENT).send();
  return;
};