const request = require("supertest");

describe("Test POST /login", () => {
  test("Should respond with 200 success", () => {
    const response = 200;
  });
  test("It should catch requests for NON-EXISTENT USERS", () => {});
});

describe("Test POST /register", () => {
  test("It Should respond with 200 successs", () => {});
  test("It Should catch missing required properties", () => {});
  test("It Should catch short passwords of less than 6 characters", () => {});
});
