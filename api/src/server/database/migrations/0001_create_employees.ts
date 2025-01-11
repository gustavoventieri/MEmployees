import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.employees, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").index().notNullable();
      table.string("email").unique().notNullable();
      table.time("workStartTime").notNullable();
      table.time("workEndTime").notNullable();
      table.time("intervalTime").notNullable();

      table
        .bigInteger("positionId")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.position)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Tabela usada para armazenar funcionarios do sistema");
    })
    .then(() => {
      console.log(`Created Table ${ETableNames.employees}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.employees);
}
