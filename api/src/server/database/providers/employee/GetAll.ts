import { ETableNames } from "../../ETableNames";
import { IPosition } from "../../models";
import { Knex } from "../../knex";

// Função que seleciona todos os funcionarios do sistema
export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IPosition[] | Error> => {
  try {
    const result = await Knex(ETableNames.employees)
      .select("*")
      .where("id", Number(id))
      .orWhere("name", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.employees)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registros");
  }
};
