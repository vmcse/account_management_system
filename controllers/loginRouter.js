const loginRouter = require("express").Router();
const path = require("path");
const User = require("../models/user");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const distFolder = path.resolve(__dirname, "../dist/");

loginRouter.get("/", (request, response, next) => {
  response.sendFile(distFolder + "/login.html");
});

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bycrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, config.SECRET, {
    expiresIn: 60 * 60,
  });

  response.status(200).send({ token });
});

module.exports = loginRouter;
