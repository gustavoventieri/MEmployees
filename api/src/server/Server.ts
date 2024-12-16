import "dotenv/config";
import "./shared/services/YupTranslations";
import express from "express";
import { router } from "./routes";

// Instanciando o servidor
const server = express();
server.use(express.json());
// Utiliando as rotas no servidor
server.use(router);

// Exporta todas as rotas
export { server };
