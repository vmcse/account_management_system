require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URL =
  process.env.MONGODB_URI || "mongodb://192.168.1.7:27017/local";

module.exports = { PORT, MONGODB_URL };
