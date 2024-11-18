import { Request, Response } from "express";

interface IPosition {
  name: string;
}

// Controller que cria um cargo
export const create = (req: Request<{}, {}, IPosition>, res: Response) => {
  const data = req.body;

  
};
