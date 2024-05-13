import { compare, genSalt, hash } from "bcryptjs";

// se o valor for maior, mais dificil será para descobrir a senha apartir do bruteforce, todavia requere mais do processador
const SALT_RANDOMS = 8;

const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(SALT_RANDOMS);
  return await hash(password, saltGenerated);
};
const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword,
};
