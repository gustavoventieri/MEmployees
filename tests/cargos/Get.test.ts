import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cargos - GetById", () => {
  it("Busca registro por id", async () => {
    const res1 = await testServer
      .post("/cargos")
      .send({ nome: "Caxias do sul" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get(`/cargos/${res1.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nome");
  });
  it("Tenta buscar registro que não existe", async () => {
    const res1 = await testServer.get("/cargos/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
