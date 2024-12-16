import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

// Funcão que inicializa o servidor
const startServer = () => {
  server.listen(process.env.PORT || 8080, () => {
    console.log(`App rodando na porta ${process.env.PORT || 8080}`);
  });
};

// Condição que confere se o estado da aplicação está local ou em produção
if (process.env.IS_LOCALHOST !== "true") {
  console.log("Rodando migrations");

  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}
