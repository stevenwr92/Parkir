const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

afterAll(() => {
  queryInterface.bulkDelete("Parkirs", null, {
    truncate: true,
    restartIdentity: true,
  });
});

describe("POST /create", () => {
  test("POST /create - success test Car", () => {
    const payload = {
      type: "Car",
      entrance: "2022-11-28T14:51",
      exit: "2022-11-28T14:51",
    };
    return request(app)
      .post("/create")
      .send(payload)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("message", "Success create data");
      });
  });

  test("POST /create - success test Motorcycle", () => {
    const payload = {
      type: "Motorcycle",
      entrance: "2022-11-28T14:51",
      exit: "2022-11-28T14:51",
    };
    return request(app)
      .post("/create")
      .send(payload)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("message", "Success create data");
      });
  });
});

describe("GET /", () => {
  test("GET / - success test Get Data", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toBeInstanceOf(Object);
    expect(res.body[0]).toHaveProperty("id", expect.any(Number));
    expect(res.body[0]).toHaveProperty("type", expect.any(String));
    expect(res.body[0]).toHaveProperty("entrance", expect.any(String));
    expect(res.body[0]).toHaveProperty("exit", expect.any(String));
    expect(res.body[0]).toHaveProperty("time", expect.any(String));
    expect(res.body[0]).toHaveProperty("fee", expect.any(Number));
  });
});
