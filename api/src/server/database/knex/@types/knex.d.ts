import { IEmployee, IPosition, IUser } from "../../models/index";

// Tipos de cada tabela
declare module "knex/types/tables" {
  interface Tables {
    position: IPosition;
    emploeyees: IEmployee;
    users: IUser;
  }
}
