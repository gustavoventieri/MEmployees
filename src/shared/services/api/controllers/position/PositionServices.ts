import { Enviroment } from "../../../../environment";
import { api } from "../../config/index";

export interface IPositionDetails {
  id: number;
  name: string;
}

export interface IPositionList {
  id: number;
  name: string;
}

type TPositionCount = {
  data: IPositionList[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = "",
  id = 0
): Promise<TPositionCount | Error> => {
  try {
    const urlRelativa = `/position?page=${page}&limit=${Enviroment.LIMITE_LINHAS}&filter=${filter}&id=${id}`;

    const { data, headers } = await api.get(urlRelativa);

    if (data) {
      return {
        data: data,
        totalCount: Number(
          headers["x-total-count"] || Enviroment.LIMITE_LINHAS
        ),
      };
    }

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

const create = async (
  dados: Omit<IPositionDetails, "id">
): Promise<number | Error> => {
  try {
    const { data } = await api.post<IPositionDetails>("/position", dados);

    if (typeof data === "number") {
      return data;
    }
    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const getById = async (id: number): Promise<IPositionDetails | Error> => {
  try {
    const { data } = await api.get(`/position/${id}`);

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

const updateById = async (
  id: number,
  dados: IPositionDetails
): Promise<void | Error> => {
  try {
    await api.put(`/position/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await api.delete(`/position/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const PositionService = {
  getById,
  updateById,
  create,
  deleteById,
  getAll,
};
