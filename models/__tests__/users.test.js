beforeEach(async () => {
  // this function executes and clears out the table before each test
  await db("users").truncate();
});

const Users = require("../users");
const db = require("../../data/dbConfig");

describe("hobbits model", () => {
  describe("insert()", () => {
    it("should insert the provided hobbits into the db", async () => {
      await Users.insert({ username: "gaffer", password: "asdsdakj" });
      const users = await db("users");

      expect(users).toHaveLength(1);
    });
  });
});
