import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.position, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name", 150).checkLength("<=", 150).index().notNullable();

      table.comment("Tabela usada para armazenar cargos do sistema");
    })
    .then(() => {
      console.log(`Created Table ${ETableNames.position}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.position);
}
