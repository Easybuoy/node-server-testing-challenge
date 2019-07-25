const request = require("supertest");
const server = require("../../server");
const db = require("../../data/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Users route", () => {
  it("[POST /api/auth/register] - should return 400 because body was not provided", async () => {
    const expectedStatusCode = 400;

    const response = await request(server).post("/api/auth/register");
    expect(response.status).toEqual(expectedStatusCode);
  });

  it("[POST /api/auth/register] - should return 201 because request was successful", async () => {
    const expectedStatusCode = 201;

    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "john", password: 123456 });
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.status).toEqual("success");
    expect(response.body.message).toEqual("User created successfully");
  });

  it("[DELETE /api/auth/users/:id] - should delete a user", async () => {
    const expectedStatusCode = 201;

    let response = await request(server)
      .post("/api/auth/register")
      .send({ username: "john", password: 123456 });
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.status).toEqual("success");
    expect(response.body.message).toEqual("User created successfully");

    response = await request(server).delete("/api/auth/users/1");
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual("success");
    expect(response.body.message).toEqual("User deleted successfully");
  });

  it("[DELETE /api/auth/users/:id] - should return user not found a user", async () => {
    const response = await request(server).delete("/api/auth/users/1");
    expect(response.status).toEqual(404);
    expect(response.body.status).toEqual("error");
    expect(response.body.message).toEqual("User not found");
  });
});
