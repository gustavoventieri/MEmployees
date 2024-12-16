import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

// Função que exclui um cargo
export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.position).where("id", "=", id).del();

    if (result > 0) return;

    return new Error("Erro ao apagar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao apagar o registro");
  }
};
