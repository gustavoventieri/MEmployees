import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./Update";
import * as deleteByID from "./Delete";
// Exportando todas as controllers de admin
export const AdminControllers = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteByID,
};