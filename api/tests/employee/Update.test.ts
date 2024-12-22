import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Employee - UpdateById", () => {
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
  it("Tenta atualizar registro sem token de autenticação", async () => {
    const resAtualizada = await testServer.put(`/employee/1`).send({
      positionId,
      name: "Juca silva",
      email: "jucaupdates@gmail.com",
    });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resAtualizada.body).toHaveProperty("errors.default");
  });
  it("Atualiza registro", async () => {
    const res1 = await testServer
      .post("/employee")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        positionId,
        name: "Juca silva",
        email: "jucaupdate@gmail.com",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/employee/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        positionId,
        name: "Juca silva",
        email: "jucaupdates@gmail.com",
      });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer
      .put("/employee/99999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        positionId,
        email: "juca@gmail.com",
        name: "Juca silva",
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
