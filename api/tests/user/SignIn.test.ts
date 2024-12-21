import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Usuários - SignIn", () => {
  beforeAll(async () => {
    await testServer.post("/signup").send({
      name: "Jorge",
      password: "123456789",
      email: "jorge@gmail.com",
    });
  });

  it("Faz login", async () => {
    const res1 = await testServer.post("/signin").send({
      password: "123456789",
      email: "jorge@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toHaveProperty("accessToken");
  });
  it("Senha errada", async () => {
    const res1 = await testServer.post("/signin").send({
      password: "1234567890",
      email: "jorge@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });
  it("Email errado", async () => {
    const res1 = await testServer.post("/signin").send({
      password: "123456789",
      email: "jorgeeeeeee@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });
  it("Formato de email inválido", async () => {
    const res1 = await testServer.post("/signin").send({
      password: "123456789",
      email: "jorge gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
  it("Senha muito pequena", async () => {
    const res1 = await testServer.post("/signin").send({
      password: "12",
      email: "jorge@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.password");
  });
  it("Não informado a senha", async () => {
    const res1 = await testServer.post("/signin").send({
      email: "jorge@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.password");
  });
  it("Não informado email", async () => {
    const res1 = await testServer.post("/signin").send({
      password: "123456789",
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.email");
  });
});
