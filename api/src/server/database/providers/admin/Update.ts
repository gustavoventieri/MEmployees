import { ETableNames } from "../../ETableNames";
import { IAdmin } from "../../models";
import { Knex } from "../../knex";
import { PasswordServices } from "../../../shared/services";

// Função que atualiza um admin por ID
export const updateById = async (
  id: number,
  admin: Omit<IAdmin, "id">
): Promise<void | Error> => {
  try {
    const hashPassword = await PasswordServices.hashPassword(admin.password);
    const result = await Knex(ETableNames.admin)
      .update({ ...admin, password: hashPassword })
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};