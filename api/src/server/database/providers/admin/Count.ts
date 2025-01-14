import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

// Função que conta quantos admins há no banco de dados
export const count = async (filter = ""): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.admin)
      .where("name", "like", `%${filter}%`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao consultar a quantidade total de registros");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar a quantidade total de registros");
  }
};
