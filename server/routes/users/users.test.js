const request = require("supertest");
const app = require("../../app");
describe("Test GET /users", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app).get("/users");
    console.log(response, ".......response.........");
    console.log(app, ".........app............");
    expect(response.statusCode).toBe(200);
  });
});
