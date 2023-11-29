const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = user.save();

  response.status(201).json(savedUser);
});

usersRouter.post("/:id", async (request, response, next) => {
  const returnedUser = await User.findById(request.params.id);

  response.status(201).json(returnedUser);
});

module.exports = usersRouter;
