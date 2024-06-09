import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.usuario, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome").index().notNullable().checkLength(">", 3);
      table.string("senha").notNullable().checkLength(">=", 8);
      table.string("email").index().unique().notNullable().checkLength(">", 6);

      table.comment("Tabela usada para armazenar usuarios do sistema");
    })
    .then(() => {
      console.log(`Created Table ${ETableNames.usuario}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.usuario);
}
