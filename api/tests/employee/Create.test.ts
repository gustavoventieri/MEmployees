import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Employee - Create", () => {
  let positionId: number | undefined = undefined;
  beforeAll(async () => {
    const resPosition = await testServer
      .post("/position")
      .send({ name: "Teste" });

    positionId = resPosition.body;
  });

  it("Cria registro", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      email: "juca@gmail.com",
      name: "Juca silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Cadastra registro 2", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      name: "Juca silva",
      email: "juca2@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta criar registro com email duplicado", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      name: "Juca silva",
      email: "jucaduplicado@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");

    const res2 = await testServer.post("/employee").send({
      positionId,
      email: "jucaduplicado@gmail.com",
      name: "duplicado",
    });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty("errors.default");
  });
  it("Tenta criar registro com nomeCompleto muito curto", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      email: "juca@gmail.com",
      name: "Ju",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
  it("Tenta criar registro sem nomeCompleto", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      email: "juca@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
  it("Tenta criar registro sem email", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      name: "Juca da Silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Tenta criar registro com email inválido", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId,
      email: "juca gmail.com",
      name: "Juca da Silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Tenta criar registro sem positionId", async () => {
    const res1 = await testServer.post("/employee").send({
      email: "juca@gmail.com",
      name: "Juca da Silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.positionId");
  });
  it("Tenta criar registro com positionId inválido", async () => {
    const res1 = await testServer.post("/employee").send({
      positionId: "teste",
      email: "juca@gmail.com",
      name: "Juca da Silva",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.positionId");
  });
  it("Tenta criar registro sem enviar nenhuma propriedade", async () => {
    const res1 = await testServer.post("/employee").send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
    expect(res1.body).toHaveProperty("errors.body.positionId");
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
