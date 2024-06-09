import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("funcionarios - GetById", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-cidades@gmail.com";
    await testServer
      .post("/cadastrar")
      .send({ nome: "Teste", email, senha: "123456789" });
    const signInRes = await testServer
      .post("/entrar")
      .send({ email, senha: "123456789" });

    accessToken = signInRes.body.accessToken;
  });

  let cargoid: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post("/cargos")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Teste" });

    cargoid = resCidade.body;
  });

  it("Tenta buscar registro sem token de autenticação (JWT)", async () => {
    const res1 = await testServer.get("/funcionarios/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("error.default");
  });

  it("Busca registro por id", async () => {
    const res1 = await testServer
      .post("/funcionarios")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cargoid,
        nomeCompleto: "Juca silva",
        email: "jucagetbyid@gmail.com",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/funcionarios/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nomeCompleto");
  });
  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer
      .get("/funcionarios/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
