import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("funcionarios - DeleteById", () => {
  let cargoid: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cargos").send({ nome: "Teste" });

    cargoid = resCidade.body;
  });

  it("Apaga registro", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      email: "jucadelete@gmail.com",
      nomeCompleto: "Juca silva",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
      .delete(`/funcionarios/${res1.body}`)
      .send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar registro que não existe", async () => {
    const res1 = await testServer.delete("/funcionarios/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
