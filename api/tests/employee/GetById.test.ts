import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Employee - GetById", () => {
  let positionId: number | undefined = undefined;
  beforeAll(async () => {
    const resPosition = await testServer
      .post("/position")
      .send({ name: "Teste" });

    positionId = resPosition.body;
  });

  it("Busca registro por id", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      name: "Juca silva",
      email: "jucagetbyid@gmail.com",
    });
    
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/employee/${res1.body}`).send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("name");
  });
  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer.get("/employee/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
