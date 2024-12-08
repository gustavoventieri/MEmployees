import { ETableNames } from "../../ETableNames";
import { IEmployee } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  id: number,
  funcionario: Omit<IEmployee, "id">
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.employees)
      .where("id", "=", funcionario.positionId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade usada não foi encontrada");
    }

    const result = await Knex(ETableNames.employees)
      .update(funcionario)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
