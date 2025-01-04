import { Knex } from "knex";

import { ETableNames } from "../ETableNames";
import { AdminProvider } from "../providers/admin";

export const seed = async (knex: Knex) => {
  await AdminProvider.create(adminSeed);
};

const adminSeed = {
  id: 1,
  name: "admin",
  email: "admin@gmail.com",
  password: "admin123",
};
