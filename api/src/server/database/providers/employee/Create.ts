import { IEmployee } from "../../models";
import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
export const create = async (
  employee: Omit<IEmployee, "id">
): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.employees)
      .where("id", "=", employee.positionId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade usada não foi encontrada");
    }

    const [result] = await Knex(ETableNames.employees)
      .insert(employee)
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
