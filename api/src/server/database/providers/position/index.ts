import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./Update";
import * as deleteByID from "./Delete";
import * as count from "./Count";

// Exportando todas as controllers de position
export const PositionsProviders = {
  ...count,
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteByID,
};
