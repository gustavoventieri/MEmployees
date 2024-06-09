import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cargos - Create", () => {
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


  
  it("Tenta criar um registro sem token de acesso (JWT)", async () => {
    const res1 = await testServer.post("/cargos").send({ nome: "Ca" });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("error.default");
  });
  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/cargos")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Dev Front-End" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta criar um registro com nome muito curto", async () => {
    const res1 = await testServer
      .post("/cargos")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "Ca" });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
});
