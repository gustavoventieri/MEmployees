import { IEmployee } from "../../models";
import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

// Função que cria um funcionario
export const create = async (
  employee: Omit<IEmployee, "id">
): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.position)
      .where("id", "=", employee.positionId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("O cargo usada não foi encontrado");
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
