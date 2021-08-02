import { app } from "../../server";
import supertest from "supertest";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  //  await connection.clear()
  await connection.close();
});

describe("In User Authenticate ", () => {
  it("should be able to login", async () => {
    const user = {
      name: "Usuario de Teste de Autenticação",
      email: "teste@autenticacao.com",
      password: "teste",
    };
    const userCreated = await supertest(app).post("/users").send(user);

    expect(userCreated.statusCode).toBe(200);
    expect(userCreated).toHaveProperty("id");
  });
});
