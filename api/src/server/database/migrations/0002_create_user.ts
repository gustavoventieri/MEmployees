import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.user, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").index().notNullable().checkLength(">", 3);
      table.string("password").notNullable().checkLength(">=", 8);
      table.string("email").index().unique().notNullable().checkLength(">", 6);

      table.comment("Tabela usada para armazenar usuarios do sistema");
    })
    .then(() => {
      console.log(`Created Table ${ETableNames.user}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.user);
}
