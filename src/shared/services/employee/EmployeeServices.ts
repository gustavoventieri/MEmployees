import { Enviroment } from "../../environment";
import { api } from "../axios";
import { IPosition, PositionService } from "../position/PositionServices";

export interface IEmployeeList {
  id: number;
  email: string;
  positionId: number;
  name: string;
  position?: IPosition | Error;
}

interface IEmployeeDetails {
  id: number;
  email: string;
  positionId: number;
  name: string;
}

type TEmployyeCount = {
  data: IEmployeeList[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TEmployyeCount | Error> => {
  try {
    const urlRelativa = `/employee?page=${page}&limit=${Enviroment.LIMITE_LINHAS}&filter=${filter}`;

    const { data, headers } = await api.get(urlRelativa, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTczNjI2MDU1OSwiZXhwIjoxNzM2MzQ2OTU5fQ.qwhclmXPP5WX0QD1nvFEjocotRJDiP4pR3_urjLRUa0",
      },
    });

    const employees = await Promise.all(
      data.map(async (employee: IEmployeeList) => {
        const position = await PositionService.getById(employee.positionId);

        return { ...employee, position };
      })
    );

    if (data) {
      return {
        data: employees,
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

const getById = async (id: number): Promise<IEmployeeDetails | Error> => {
  try {
    const { data } = await api.get(`/employee/${id}`);

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

const create = async (
  dados: Omit<IEmployeeDetails, "id">
): Promise<number | Error> => {
  try {
    const { data } = await api.post<IEmployeeDetails>("/employee", dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  dados: IEmployeeDetails
): Promise<void | Error> => {
  try {
    await api.put(`/employee/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await api.delete(`/employee/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao apagar o registro."
    );
  }
};

export const employeeService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
