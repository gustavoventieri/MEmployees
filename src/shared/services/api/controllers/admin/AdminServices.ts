import { Enviroment } from "../../../../environment";
import { api } from "../../config/index";

export interface IAdminDetails {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IAdminList {
  id: number;
  name: string;
  email: string;
  password: string;
}

type TPositionCount = {
  data: IAdminList[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = "",
  id = 0
): Promise<TPositionCount | Error> => {
  try {
    const urlRelativa = `/admin?page=${page}&limit=${Enviroment.LIMITE_LINHAS}&filter=${filter}&id=${id}`;

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
  dados: Omit<IAdminDetails, "id">
): Promise<number | Error> => {
  try {
    const { data } = await api.post<IAdminDetails>("/position", dados, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTczNjM1NjU2NCwiZXhwIjoxNzM2NDQyOTY0fQ.Vv1XbFxb7X7VlbgClUYqt_Id3pi2-Sj50JFYn2xsELw",
      },
    });

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

const getById = async (id: number): Promise<IAdminDetails | Error> => {
  try {
    const { data } = await api.get(`/position/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTczNjM1NjU2NCwiZXhwIjoxNzM2NDQyOTY0fQ.Vv1XbFxb7X7VlbgClUYqt_Id3pi2-Sj50JFYn2xsELw",
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

const updateById = async (
  id: number,
  dados: IAdminDetails
): Promise<void | Error> => {
  try {
    await api.put(`/position/${id}`, dados, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTczNjM1NjU2NCwiZXhwIjoxNzM2NDQyOTY0fQ.Vv1XbFxb7X7VlbgClUYqt_Id3pi2-Sj50JFYn2xsELw",
      },
    });
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await api.delete(`/position/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTczNjM1NjU2NCwiZXhwIjoxNzM2NDQyOTY0fQ.Vv1XbFxb7X7VlbgClUYqt_Id3pi2-Sj50JFYn2xsELw",
      },
    });
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
