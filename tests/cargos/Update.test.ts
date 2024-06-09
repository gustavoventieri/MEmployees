import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cargos - UpdateById", () => {
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

  it("Tenta atualizar registro sem token de autenticação (JWT)", async () => {
    const res1 = await testServer
      .put("/cargos/99999")
      .send({ nome: "Dev Back-End" });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
  it("Atualiza registro", async () => {
    const res1 = await testServer
      .post("/cargos")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Dev Front-end" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/cargos/${res1.body}`)
      .send({ nome: "dev" });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer
      .put("/cargos/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Dev" });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
