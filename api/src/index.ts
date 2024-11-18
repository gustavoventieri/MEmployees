import { server } from "./server/Server";

// Iniciando o servidor
server.listen(process.env.PORT || 8080, () => console.log(`Servidor Rodando na Porta ${process.env.PORT || 8080}`)
);
