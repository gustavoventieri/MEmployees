import { ETableNames } from "../../ETableNames";
import { IAdmin } from "../../models";
import { Knex } from "../../knex";

// Função que busca por um usuario por email
export const getByEmail = async (email: string): Promise<IAdmin | Error> => {
  try {
    const result = await Knex(ETableNames.admin)
      .select("*")
      .where("email", "=", email)
      .first();
    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar o registro");
  }
};
