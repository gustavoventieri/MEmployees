import { ETableNames } from "../../ETableNames";
import { ICargo } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  id: number,
  cargo: Omit<ICargo, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cargo)
      .update(cargo)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
