import { IAdmin } from "../../models";
import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import { PasswordServices } from "../../../shared/services";

// Função que cria um usuario
export const create = async (
  admin: Omit<IAdmin, "id">
): Promise<number | Error> => {
  try {
    const hashPassword = await PasswordServices.hashPassword(admin.password);
    const [result] = await Knex(ETableNames.admin)
      .insert({ ...admin, password: hashPassword })
      .returning("id");

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
