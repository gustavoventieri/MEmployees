import { ICargo } from "../../models";
declare module "knex/types/tables" {
  interface Tables {
    cargo: ICargo;
  }
}
