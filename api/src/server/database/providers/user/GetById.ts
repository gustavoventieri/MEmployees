import { ETableNames } from "../../ETableNames";
import { IUser } from "../../models";
import { Knex } from "../../knex";

// Função que seleciona um cargo por ID
export const getById = async (id: number): Promise<IUser | Error> => {
  try {
    const result = await Knex(ETableNames.user)
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
