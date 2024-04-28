import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cargos - UpdateById", () => {
  it("Atualiza registro", async () => {
    const res1 = await testServer
      .post("/cargos")
      .send({ nome: "Dev Front-end" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/cargos/${res1.body}`)
      .send({ nome: "dev" });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/cargos/99999").send({ nome: "Dev" });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
