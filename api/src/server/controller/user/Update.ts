import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { IUser } from "../../database/models";
import { UserProvider } from "../../database/providers/user";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IUser, "id"> {}

export const updateUserByIdValidation = validation((get) => ({
  body: get<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
      name: yup.string().required().min(3),
    })
  ),
  params: get<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateUserById = async (
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

  const result = await UserProvider.updateById(req.params.id, req.body);
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
