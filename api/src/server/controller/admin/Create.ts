import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { IAdmin } from "../../database/models";
import { AdminProvider } from "../../database/providers/admin";

interface IBodyProps extends Omit<IAdmin, "id"> {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      password: yup.string().required().min(6),
      email: yup.string().required().email().min(5),
    })
  ),
}));

export const signUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await AdminProvider.create(req.body);

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
