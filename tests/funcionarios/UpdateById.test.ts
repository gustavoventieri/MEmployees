import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("funcionarios - UpdateById", () => {
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

  it("Tenta atualizar registro sem token de acesso", async () => {
    const res1 = await testServer.put("/funcionarios/99999").send({
      cargoid,
      email: "juca@gmail.com",
      nomeCompleto: "Juca silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });


  it("Atualiza registro", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      nomeCompleto: "Juca silva",
      email: "jucaupdate@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/funcionarios/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        cargoid,
        nomeCompleto: "Juca silva",
        email: "jucaupdates@gmail.com",
      });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/funcionarios/99999").set({ Authorization: `Bearer ${accessToken}` }).send({
      cargoid,
      email: "juca@gmail.com",
      nomeCompleto: "Juca silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
