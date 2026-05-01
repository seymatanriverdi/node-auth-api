const request = require("supertest");
const app = require("../app");

describe("GET /profile", () => {
  it("token yoksa 401 dönmeli", async () => {
    const res = await request(app).get("/profile");

    expect(res.statusCode).toBe(401);
  });
});

describe("POST /register validation", () => {
  it("username kısa ise 400 dönmeli", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        username: "ab",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
  });

  it("password kısa ise 400 dönmeli", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        username: "seymaTest",
        password: "123"
      });

    expect(res.statusCode).toBe(400);
  });
});