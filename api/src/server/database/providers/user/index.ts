import * as getByEmail from "./SignIn";
import * as create from "./SignUp";
export const UserProvider = {
  ...getByEmail,
  ...create,
};
