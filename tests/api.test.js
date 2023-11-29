const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);
const test_helper = require("./test_helper");

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(test_helper.initialUsers);
});

describe("usersRouter", () => {
  test("successfully rejects a duplicate username", async () => {
    const newUser = {
      username: "newUser1",
      password: "1234",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toEqual("username must be unique");
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
    expect(savedUser).toHaveLength(test_helper.initialUsers.length + 1);
    expect(username).toContain(newUser.username);
  });
});

describe("loginRouter", () => {
  test("user logged in successfully", async () => {
    const user = {
      username: "newUser1",
      password: "1234",
    };

    const result = await api
      .post("/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    console.log(result.body);
  });

  test("user login fails for invalid password", async () => {
    const user = {
      username: "newUser1",
      password: "12345",
    };

    await api
      .post("/login")
      .send(user)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("user login fails for invalid username", async () => {
    const user = {
      username: "newUser3",
      password: "1234",
    };

    await api
      .post("/login")
      .send(user)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
