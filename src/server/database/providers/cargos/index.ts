import * as deleteById from "./DeleteById";
import * as updateById from "./Update";
import * as getById from "./GetById";
import * as create from "./Create";
import * as getAll from "./GetAll";
import * as count from "./Count";
export const CargoProviders = {
  ...deleteById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
  ...count,
};
