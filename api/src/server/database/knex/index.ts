import knex from "knex";
import { development, production, test } from "./Enviroment";

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
