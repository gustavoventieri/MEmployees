import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cargos - GetById", () => {
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

  it("Busca registro por id", async () => {
    const res1 = await testServer
      .post("/cargos")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Dev Front-End" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/cargos/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nome");
  });
  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer
      .get("/cargos/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
