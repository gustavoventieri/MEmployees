import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPosition } from "../../models";

// Função que provê a criação de um cargo
export const create = async (
  position: Omit<IPosition, "id">
): Promise<Number | Error> => {
  try {
    const [result] = await Knex(ETableNames.position)
      .insert(position)
      .returning("id");
    if (typeof result === "object") {
      return result.id;
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar o registro");
  }
};
