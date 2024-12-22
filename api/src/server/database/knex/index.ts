import knex from "knex";
import "dotenv/config";
import pg from "pg";
import { development, production, test } from "./Enviroment";

if (process.env.PROJECT_STATE === "production") {
  pg.types.setTypeParser(20, "text", parseInt);
}

const getEnviroment = () => {
  switch (process.env.PROJECT_STATE) {
    case "production":
      return production;
    case "test":
      return test;
    default:
      return development;
  }
};

export const Knex = knex(getEnviroment());
