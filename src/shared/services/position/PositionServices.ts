import { Enviroment } from "../../environment";
import { api } from "../axios";

export interface IPosition {
  id: number;
  name: string;
}

const getById = async (id: number): Promise<IPosition | Error> => {
  try {
    const { data } = await api.get(`/position/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTczNjI2MDU1OSwiZXhwIjoxNzM2MzQ2OTU5fQ.qwhclmXPP5WX0QD1nvFEjocotRJDiP4pR3_urjLRUa0",
      },
    });

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

export const PositionService = {
  getById,
};
