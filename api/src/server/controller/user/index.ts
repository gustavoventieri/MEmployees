import * as signIn from "./SignIn";
import * as signUp from "./SignUp";

// Exportando todas as controllers de position
export const UsersControler = {
  ...signIn,
  ...signUp,
};
