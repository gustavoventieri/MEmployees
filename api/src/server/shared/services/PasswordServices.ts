import { compare, genSalt, hash } from "bcryptjs";

const SALT_RANDOMS = 10;

// Função que criptrogafa a senha do usuário
const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(SALT_RANDOMS);
  return await hash(password, saltGenerated);
};


// Função que decriptografa a senha e compara as senhas do usuário
const verifypassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordServices = {
  hashPassword,
  verifypassword
};
