const uuid = require("uuid/v4");
const HttpError = require("../models/http-errors");
const User = require("../models/users-model");

const signup = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    teleNo,
    password,
    passwordResetQuestion,
    answer,
  } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({email: email});
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    res.json({
      message: "Signing up failed, please try again later.",
      login: 0,
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
      login: 0,
    });
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    teleNo,
    email,
    password,
    passwordResetQuestion,
    answer,
  });

  try {
    console.log(createdUser);
    await createdUser.save();
    // res.json({message: "Signed Up", login: 1});
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    res.json({message: "Signing up failed, please try again.", login: 0});
    return next(error);
  }

  res.status(201).json({
    user: createdUser.toObject({getters: true}),
    login: 1,
    message: "Signed Up",
  });
};

const login = async (req, res, next) => {
  const {email, password} = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({email: email});
  } catch (err) {
    const error = new HttpError(
      "Login up failed, please try again later.",
      500
    );
    res.json({message: "Login up failed, please try again later.", login: 0});
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid username or password.", 401);
    res.json({message: "Invalid username or password", login: 0});
    return next(error);
  }

  res.json({
    message: "Logged in!",
    login: 1,
    type: existingUser.type,
    userDetails: existingUser,
  });
};

const updatePasswordRequest = async (req, res, next) => {
  const {email} = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({email: email});
  } catch (err) {
    const error = new HttpError(
      "Email check up failed, please try again later.",
      500
    );
    res.json({
      message: "Email check up failed, please try again later.",
      login: 0,
    });
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid email", 401);
    res.json({message: "Invalid email", login: 0});
    return next(error);
  }

  res.json({
    message: "Logged in!",
    login: 1,
    user: existingUser.toObject({getters: true}),
  });
};

const updatePassword = async (req, res, next) => {
  const {email, id, password} = req.body;
  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Password update failed, please try again later.",
      500
    );
    res.json({
      message: "Password update failed, please try again later.",
      login: 0,
    });
    return next(error);
  }

  user.password = password;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user password.",
      500
    );
    return next(error);
  }

  res.status(200).json({user: user.toObject({getters: true})});

  res.json({
    message: "Logged in!",
    login: 1,
    user: user.toObject({getters: true}),
  });
};


//harshani add kale
const getUsers = async (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.login = login;
exports.signup = signup;
exports.updatePasswordRequest = updatePasswordRequest;
exports.updatePassword = updatePassword;
exports.getUsers = getUsers;
