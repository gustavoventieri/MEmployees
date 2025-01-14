import { Enviroment } from "../../environment";

const secretKey = Enviroment.PASSDECRYPT;

export const encryptData = (data: number) => {
  return CryptoJS.AES.encrypt(data.toString(), secretKey).toString();
};
