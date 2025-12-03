const request = require("supertest");
const app = require("../src/server");

describe("GET /", () => {
  it("should return API running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "API is running");
  });
});
