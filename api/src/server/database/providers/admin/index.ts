import * as deleteById from "./Delete";
import * as updateById from "./Update";
import * as getByEmail from "./GetByEmail";
import * as getByID from "./GetById";

import * as create from "./Create";
import * as getAll from "./GetAll";
import * as count from "./Count";

export const AdminProvider = {
  ...deleteById,
  ...updateById,
  ...getByEmail,
  ...getAll,
  ...getByID,
  ...count,
  ...create,
};
