import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("funcionarios - GetById", () => {
  let cargoid: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cargos").send({ nome: "Teste" });

    cargoid = resCidade.body;
  });

  it("Busca registro por id", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      nomeCompleto: "Juca silva",
      email: "jucagetbyid@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/funcionarios/${res1.body}`)
      .send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nomeCompleto");
  });
  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer.get("/funcionarios/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
