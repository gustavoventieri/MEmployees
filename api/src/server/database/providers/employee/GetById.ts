import { ETableNames } from "../../ETableNames";
import { IPosition } from "../../models";
import { Knex } from "../../knex";

// Função que seleciona um funcionario por ID
export const getById = async (id: number): Promise<IPosition | Error> => {
  try {
    const result = await Knex(ETableNames.employees)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar o registro");
  }
};
