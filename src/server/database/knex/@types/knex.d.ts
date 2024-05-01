import { ICargo, IFuncionario } from "../../models";
declare module "knex/types/tables" {
  interface Tables {
    cargo: ICargo;
    funcionario: IFuncionario;
  }
}
