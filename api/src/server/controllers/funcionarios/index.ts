import * as deleteById from "./Delete";
import * as updateById from "./Update";
import * as getById from "./GetById";
import * as create from "./Create";
import * as getAll from "./GetAll";

export const FuncionariosControllers = {
  ...deleteById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
};
