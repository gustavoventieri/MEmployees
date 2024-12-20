import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Employee - UpdateById", () => {
  let positionId: number | undefined = undefined;
  beforeAll(async () => {
    const resPosition = await testServer
      .post("/position")
      .send({ name: "Teste" });

    positionId = resPosition.body;
  });

  it("Atualiza registro", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      name: "Juca silva",
      email: "jucaupdate@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer.put(`/employee/${res1.body}`).send({
      positionId,
      name: "Juca silva",
      email: "jucaupdates@gmail.com",
    });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/employee/99999").send({
      positionId,
      email: "juca@gmail.com",
      name: "Juca silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
