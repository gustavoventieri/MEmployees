import { ETableNames } from "../../ETableNames";
import { IEmployee } from "../../models";
import { Knex } from "../../knex";

// Função que atualiza um funcionario por ID
export const updateById = async (
  id: number,
  employee: Omit<IEmployee, "id">
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.position)
      .where("id", "=", employee.positionId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("O cargo usado não foi encontrado");
    }

    const result = await Knex(ETableNames.employees)
      .update(employee)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
