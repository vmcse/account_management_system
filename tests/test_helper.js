const bycrypt = require("bcryptjs");

const generateHash = async (password) => {
  await bycrypt.hash(password, 10);
};
const hash = generateHash("1234");

const initialUsers = [
  {
    username: "newUser1",
    passwordHash:
      "$2a$10$AnjSGoos5hbM46XgpSWaS.jSW7iosYJ6Y/aaOjHs7/b8GXcbH5bly",
  },
  {
    username: "newUser2",
    passwordHash:
      "$2a$10$AnjSGoos5hbM46XgpSWaS.jSW7iosYJ6Y/aaOjHs7/b8GXcbH5bly",
  },
];

module.exports = { initialUsers };
