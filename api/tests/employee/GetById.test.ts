import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Employee - GetById", () => {
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

  let positionId: number | undefined = undefined;
  beforeAll(async () => {
    const resPosition = await testServer
      .post("/position")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Teste" });

    positionId = resPosition.body;
  });

  it("Tenta buscar registro por id sem token de autenticação", async () => {
    const resBuscada = await testServer.get(`/employee/1`).send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resBuscada.body).toHaveProperty("errors.default");
  });

  it("Busca registro por id", async () => {
    const res1 = await testServer
      .post("/employee")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        positionId,
        name: "Juca silva",
        email: "jucagetbyid@gmail.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/employee/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("name");
  });
  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer
      .get("/employee/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
