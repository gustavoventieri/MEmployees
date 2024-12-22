import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Position - DeleteById", () => {
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

  it("Apaga registro", async () => {
    const res1 = await testServer
      .post("/position")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Dev Junior" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
      .delete(`/position/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar registro sem token de autenticação", async () => {
    const resApagada = await testServer.delete(`/position/1`).send();

    expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resApagada.body).toHaveProperty("errors.default");
  });
  it("Tenta apagar registro que não existe", async () => {
    const res1 = await testServer
      .delete("/position/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
