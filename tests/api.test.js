const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

describe("usersRouter", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("successfully creates a new user", async () => {
    const newUser = {
      username: "admin",
      password: "1234",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const savedUser = await User.find({});
    const username = savedUser.map((u) => u.username);
    expect(savedUser).toHaveLength(1);
    expect(username).toContain(newUser.username);
  });
});

describe("loginRouter", () => {
  test("user logged in successfully", async () => {
    const user = {
      username: "admin",
      password: "1234",
    };

    await api
      .post("/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
