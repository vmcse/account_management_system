const express = require("express");
const app = express();
const cors = require("cors");
const usersRouter = require("./controllers/usersRouter");
const config = require("./utils/config");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

mongoose.set("strictQuery", true);

console.log(`Connecting to ${config.MONGODB_URL}`);

mongoose
  .connect(config.MONGODB_URL)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error.message));

app.use("/api/users", usersRouter);

module.exports = app;
