const uuid = require("uuid/v4");
const HttpError = require("../models/http-errors");
const User = require("../models/users-model");

const signup = async (req, res, next) => {
  const { firstName, lastName, email, teleNo, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    res.json({
      message: "Signing up failed, please try again later.",
      login: 0
    });
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User already exists, please login instead.",
      422
    );
    res.json({
      message: "User already exists, please login instead.",
      login: 0
    });
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    teleNo,
    email,
    password
  });

  try {
    console.log(createdUser);
    await createdUser.save();
    res.json({ message: "Signed Up", login: 1 });
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    res.json({ message: "Signing up failed, please try again.", login: 0 });
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Login up failed, please try again later.",
      500
    );
    res.json({ message: "Login up failed, please try again later.", login: 0 });
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid username or password.", 401);
    res.json({ message: "Invalid username or password", login: 0 });
    return next(error);
  }

  res.json({ message: "Logged in!", login: 1 });
};

exports.login = login;
exports.signup = signup;
