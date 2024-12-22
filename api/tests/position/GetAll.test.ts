import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Position - GetAll", () => {
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
  it("Buscar todos os registros", async () => {
    const res1 = await testServer
      .post("/position")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Dev Junior" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get("/position")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
  it("Tenta buscar todos os registros sem token de autenticação", async () => {
    const resBuscada = await testServer.get("/position").send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resBuscada.body).toHaveProperty("errors.default");
  });
});
