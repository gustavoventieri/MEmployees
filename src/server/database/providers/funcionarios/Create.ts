import { IFuncionario } from "../../models";
import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
export const create = async (
  funcionario: Omit<IFuncionario, "id">
): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cargo)
      .where("id", "=", funcionario.cargoid)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade usada não foi encontrada");
    }

    const [result] = await Knex(ETableNames.funcionario)
      .insert(funcionario)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar");
  } catch (error) {
    return new Error("Erro ao cadastrar o registro");
  }
};
