import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("funcionarios - Create", () => {
  let cargoid: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer.post("/cargos").send({ nome: "Teste" });

    cargoid = resCidade.body;
  });

  it("Cria registro", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      email: "juca@gmail.com",
      nomeCompleto: "Juca silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Cadastra registro 2", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      nomeCompleto: "Juca silva",
      email: "juca2@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta criar registro com email duplicado", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      nomeCompleto: "Juca silva",
      email: "jucaduplicado@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const res2 = await testServer.post("/funcionarios").send({
      cargoid,
      email: "jucaduplicado@gmail.com",
      nomeCompleto: "duplicado",
    });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });
  it("Tenta criar registro com nomeCompleto muito curto", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      email: "juca@gmail.com",
      nomeCompleto: "Ju",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
  });
  it("Tenta criar registro sem nomeCompleto", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      email: "juca@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
  });
  it("Tenta criar registro sem email", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      nomeCompleto: "Juca da Silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Tenta criar registro com email inválido", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid,
      email: "juca gmail.com",
      nomeCompleto: "Juca da Silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Tenta criar registro sem cargoid", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      email: "juca@gmail.com",
      nomeCompleto: "Juca da Silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cargoid");
  });
  it("Tenta criar registro com cargoid inválido", async () => {
    const res1 = await testServer.post("/funcionarios").send({
      cargoid: "teste",
      email: "juca@gmail.com",
      nomeCompleto: "Juca da Silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.cargoid");
  });
  it("Tenta criar registro sem enviar nenhuma propriedade", async () => {
    const res1 = await testServer.post("/funcionarios").send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
    expect(res1.body).toHaveProperty("errors.body.cargoid");
    expect(res1.body).toHaveProperty("errors.body.nomeCompleto");
  });
});
