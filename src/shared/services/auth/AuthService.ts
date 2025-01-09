import { api } from "../axios";

interface IAuth {
  accessToken: string;
}

interface ILogin {
  email: string;
  password: string;
}

const auth = async (dados: ILogin): Promise<IAuth | Error> => {
  try {
    const { data } = await api.post("/signin", dados);

    if (data) {
      return data;
    }

    return new Error("Erro no login.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro no login."
    );
  }
};

export const AuthService = {
  auth,
};
