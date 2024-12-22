import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Position - UpdateById", () => {
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

  it("Atualiza registro", async () => {
    const res1 = await testServer
      .post("/position")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Dev Junior" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/position/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Dev Junior" });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro sem token de autenticação", async () => {
    const resAtualizada = await testServer
      .put(`/position/1`)
      .send({ name: "Dev Junior" });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resAtualizada.body).toHaveProperty("errors.default");
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer
      .put("/position/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Dev Junior" });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
