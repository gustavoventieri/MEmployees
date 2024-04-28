import "dotenv/config"
import { server } from './server/Server';
const port = process.env.PORT

server.listen(port, () => console.log(`Servidor online e rodando na porta ${port}`))