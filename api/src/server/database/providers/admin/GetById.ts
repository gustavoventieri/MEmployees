import { ETableNames } from "../../ETableNames";
import { IAdmin } from "../../models";
import { Knex } from "../../knex";

// Função que seleciona um cargo por ID
export const getById = async (id: number): Promise<IAdmin | Error> => {
  try {
    const result = await Knex(ETableNames.admin)
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
