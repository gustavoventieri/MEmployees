import { ICargo, IFuncionario, IUsers } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    cargo: ICargo;
    funcionario: IFuncionario;
    usuario: IUsers;
  }
}
