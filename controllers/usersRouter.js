const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

usersRouter.get("/", async (request, response, next) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

usersRouter.post("/:id", async (request, response, next) => {
  const returnedUser = await User.findById(request.params.id);

  response.status(201).json(returnedUser);
});

module.exports = usersRouter;
