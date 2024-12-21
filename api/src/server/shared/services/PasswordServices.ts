import { compare, genSalt, hash } from "bcryptjs";

const SALT_RANDOMS = 10;

const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(SALT_RANDOMS);
  return await hash(password, saltGenerated);
};

const verifypassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordServices = {
  hashPassword,
  verifypassword
};
