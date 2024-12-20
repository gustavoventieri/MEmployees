import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Employee - GetAll", () => {
  let positionId: number | undefined = undefined;
  beforeAll(async () => {
    const resPosition = await testServer
      .post("/position")
      .send({ name: "Teste" });

    positionId = resPosition.body;
  });

  it("Busca registros", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      email: "jucagetall@gmail.com",
      name: "Juca silva",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/employee").send();
    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
