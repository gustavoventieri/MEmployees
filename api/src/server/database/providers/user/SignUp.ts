import { IUser } from "../../models";
import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
//import { PasswordCrypto } from "../../../shared/services";

// Função que cria um usuario
export const create = async (
  user: Omit<IUser, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.user).insert(user).returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar o registro");
  }
};
