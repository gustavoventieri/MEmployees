import { Enviroment } from "../../environment";
import CryptoJS from "crypto-js";
const secretKey = Enviroment.PASSDECRYPT;

export const encryptData = (data: number) => {
  return CryptoJS.AES.encrypt(data.toString(), secretKey).toString();
};
