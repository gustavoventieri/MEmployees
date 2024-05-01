import { ETableNames } from "../../ETableNames";
import { IFuncionario } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  id: number,
  funcionario: Omit<IFuncionario, "id">
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cargo)
      .where("id", "=", funcionario.cargoid)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade usada não foi encontrada");
    }

    const result = await Knex(ETableNames.funcionario)
      .update(funcionario)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
