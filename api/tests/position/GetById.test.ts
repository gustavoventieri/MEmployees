import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Position - GetById", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create-position@gmail.com";
    await testServer
      .post("/signup")
      .send({ name: "Teste", email, password: "123456789" });
    const signInRes = await testServer
      .post("/signin")
      .send({ email, password: "123456789" });

    accessToken = signInRes.body.accessToken;
  });

  it("Busca registro por id", async () => {
    const res1 = await testServer
      .post("/position")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Dev Junior" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/position/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("name");
  });
  it("Tenta buscar registro por id sem token de autenticação", async () => {
    const resBuscada = await testServer.get(`/position/1`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resBuscada.body).toHaveProperty("errors.default");
  });
  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer
      .get("/position/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
