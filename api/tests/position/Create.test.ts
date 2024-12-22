import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Position - Create", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-position@gmail.com";
    await testServer
      .post("/signup")
      .send({ name: "Teste", email, password: "123456789" });
    const signInRes = await testServer
      .post("/signin")
      .send({ email, password: "123456789" });

    accessToken = signInRes.body.accessToken;
  });
  it("Tenta criar um registro sem token de acesso", async () => {
    const res1 = await testServer
      .post("/position")
      .send({ name: "Dev Junior" });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/position")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "Dev Junior" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta criar um registro com nome muito curto", async () => {
    const res1 = await testServer
      .post("/position")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: "De" });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
