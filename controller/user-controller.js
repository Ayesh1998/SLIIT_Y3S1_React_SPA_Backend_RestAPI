const uuid = require("uuid/v4");
const HttpError = require("../models/http-errors");

const DUMMY_USERS = [
  {
    id: "u1",
    firstName: "Max Schwarz",
    lastName: "fdfdf",
    email: "test@test.com",
    teleNo: "0774455112",
    password: "testers"
  }
];

const signup = (req, res, next) => {
  const { firstName, lastName, email, teleNo, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuid(),
    firstName,
    lastName,
    teleNo,
    email,
    password
  };
  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(user => user.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged in!" });
};

exports.login = login;
exports.signup = signup;
