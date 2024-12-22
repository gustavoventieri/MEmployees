import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Employee - DeleteById", () => {
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
  it("Tenta apagar registro sem token de autenticação", async () => {
    const resApagada = await testServer.delete(`/employee/1`).send();
    expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resApagada.body).toHaveProperty("errors.default");
  });
  it("Apaga registro", async () => {
    const res1 = await testServer
      .post("/employee")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        positionId,
        email: "jucadelete@gmail.com",
        name: "Juca silva",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
      .delete(`/employee/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar registro que não existe", async () => {
    const res1 = await testServer
      .delete("/employee/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
