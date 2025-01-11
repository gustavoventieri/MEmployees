import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { EmployeesProviders } from "../../database/providers/employee";
import { validation } from "../../shared/middlewares";
import { IEmployee } from "../../database/models";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IEmployee, "id"> {}

export const updateEmployeeByIdValidation = validation((get) => ({
  body: get<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      positionId: yup.number().integer().required(),
      name: yup.string().required().min(3),
      workStartTime: yup.string().required(),
      workEndTime: yup.string().required(),
    })
  ),
  params: get<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateEmployeeById = async (
  req: Request<IParamProps, {}, IBodyProps>,
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

  const result = await EmployeesProviders.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return;
  }

  res.status(StatusCodes.NO_CONTENT).json(result);
  return;
};
