import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { AdminProvider } from "../../database/providers/admin";
interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}
export const getAllAdminsValidation = validation((get) => ({
  query: get<IQueryProps>(
    yup.object().shape({
      filter: yup.string().optional().default(""),
      page: yup.number().integer().optional().moreThan(0).default(1),
      limit: yup.number().integer().optional().moreThan(0).default(7),
    })
  ),
}));

export const getAllAdmins = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const result = await AdminProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || ""
  );
  const count = await AdminProvider.count(req.query.filter);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
    return;
  } else if (count instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
    return;
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  res.status(StatusCodes.OK).json(result);
  return;
};