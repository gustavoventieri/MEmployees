import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Employee - DeleteById", () => {
  let positionId: number | undefined = undefined;
  beforeAll(async () => {
    const resPosition = await testServer
      .post("/position")
      .send({ name: "Teste" });

    positionId = resPosition.body;
  });

  it("Apaga registro", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      email: "jucadelete@gmail.com",
      name: "Juca silva",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer.delete(`/employee/${res1.body}`).send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar registro que não existe", async () => {
    const res1 = await testServer.delete("/employee/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
