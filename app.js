const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const usersRouter = require("./controllers/usersRouter");
const config = require("./utils/config");
const mongoose = require("mongoose");
const loginRouter = require("./controllers/loginRouter");
const middleware = require("./utils/middleware");

mongoose.set("strictQuery", false);

console.log(`Connecting to ${config.MONGODB_URL}`);

mongoose
  .connect(config.MONGODB_URL)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error.message));

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);
app.use("/login", loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
