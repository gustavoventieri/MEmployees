import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable("funcionario", (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nomeCompleto").index().notNullable();
      table.string("email").unique().notNullable();
      table
        .bigInteger("cargoid")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.cargo)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Tabela usada para armazenar funcionarios do sistema");
    })
    .then(() => {
      console.log(`Created Table ${ETableNames.funcionario}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.funcionario);
}
