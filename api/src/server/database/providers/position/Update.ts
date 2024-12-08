import { ETableNames } from "../../ETableNames";
import { IPosition } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  id: number,
  position: Omit<IPosition, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.position)
      .update(position)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
