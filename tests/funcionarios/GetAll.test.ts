import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("funcionarios - GetAll", () => {
  let cargoid: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cargos").send({ nome: "Teste" });

    cargoid = resCidade.body;
  });

  it("Busca registros", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      email: "jucagetall@gmail.com",
      nomeCompleto: "Juca silva",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/funcionarios").send();
    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
