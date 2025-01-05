import axios from "axios";
import { Enviroment } from "../../environment";

export const api = axios.create({
  baseURL: Enviroment.URL_BASE,
});
