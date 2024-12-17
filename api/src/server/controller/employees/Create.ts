import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

import { EmployeesProviders } from "./../../database/providers/employee";
import { validation } from "../../shared/middlewares";
import { IEmployee } from "./../../database/models";

interface IBodyProps extends Omit<IEmployee, "id"> {}

export const createEmployeeValidation = validation((get) => ({
  body: get<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      positionId: yup.number().integer().required(),
      name: yup.string().required().min(3),
    })
  ),
}));

export const createEmployee = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await EmployeesProviders.create(req.body);

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
