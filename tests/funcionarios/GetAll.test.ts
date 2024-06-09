import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("funcionarios - GetAll", () => {
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

  it("Busca registros", async () => {
    const res1 = await testServer
      .post("/funcionarios")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cargoid,
        email: "jucagetall@gmail.com",
        nomeCompleto: "Juca silva",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get("/funcionarios")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
