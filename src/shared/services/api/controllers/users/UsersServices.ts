import { Enviroment } from "../../../../environment";
import { api } from "../../config/index";

export interface IUserDetails {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserList {
  id: number;
  name: string;
  email: string;
  password: string;
}

type TAdminCount = {
  data: IUserList[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = "",
  id = 0
): Promise<TAdminCount | Error> => {
  try {
    const urlRelativa = `/user?page=${page}&limit=${Enviroment.LIMITE_LINHAS}&filter=${filter}&id=${id}`;

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
  dados: Omit<IUserDetails, "id">
): Promise<number | Error> => {
  try {
    const { data } = await api.post<IUserDetails>("/user", dados);

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

const getById = async (id: number): Promise<IUserDetails | Error> => {
  try {
    const { data } = await api.get(`/user/${id}`);

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
  dados: IUserDetails
): Promise<void | Error> => {
  try {
    await api.put(`/user/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await api.delete(`/user/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const UserServices = {
  getById,
  updateById,
  create,
  deleteById,
  getAll,
};
