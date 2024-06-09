import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("funcionarios - DeleteById", () => {
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
  it("Tenta apagar registro sem token de autenticação", async () => {
    const res1 = await testServer.delete("/funcionarios/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("error.default");
  });
  it("Apaga registro", async () => {
    const res1 = await testServer
      .post("/funcionarios")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cargoid,
        email: "jucadelete@gmail.com",
        nomeCompleto: "Juca silva",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
      .delete(`/funcionarios/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar registro que não existe", async () => {
    const res1 = await testServer
      .delete("/funcionarios/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
