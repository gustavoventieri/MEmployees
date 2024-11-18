import express from "express";
import { router } from "./routes";
import "dotenv/config";

// Instanciando o servidor
const server = express();

// Utiliando as rotas no servidor
server.use(router);

export { server };
