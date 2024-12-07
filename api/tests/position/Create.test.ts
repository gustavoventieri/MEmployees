import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Position - Create", () => {
  it("Cria registro", async () => {
    const res1 = await testServer
      .post("/position")
      .send({ name: "Dev Junior" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta criar um registro com nome muito curto", async () => {
    const res1 = await testServer.post("/position").send({ name: "De" });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.body.name");
  });
});
