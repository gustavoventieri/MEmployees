import * as getByEmail from "./GetByEmail";
import * as create from "./Create";
export const AdminProvider = {
  ...getByEmail,
  ...create,
};
