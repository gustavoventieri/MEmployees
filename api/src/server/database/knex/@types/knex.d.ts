import { IEmployee, IPosition, IUser } from "../../models/index";

declare module "knex/types/tables" {
  interface Tables {
    position: IPOsition;
    emploeyees: IEmployee;
    users: IUser;
  }
}
