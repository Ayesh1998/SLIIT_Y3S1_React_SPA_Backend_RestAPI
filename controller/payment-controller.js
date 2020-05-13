const uuid = require("uuid/v4");
const HttpError = require("../models/http-errors");
const PayUserDetails = require("../models/payUserDetails-model");
const PayCardDetails = require("../models/payCardDetails-model");

//------------------------------------Controller details for user-----------------------------------------------
const addPayUser = async (req, res, next) => {
  const {
    email,
    name,
    phone,
    address,
    city,
    province,
    isSave
  } = req.body;

  const createdPayUser = new PayUserDetails({
    email,
    name,
    phone,
    address,
    city,
    province,
    isSave
  });

  try {
    console.log(createdPayUser);
    await createdPayUser.save();
    res.json({message: "Saved data to DB", save: 1});
  } catch (err) {
    const error = new HttpError("Saved failed, please try again.", 500);
    res.json({message: "Saved failed, please try again.", save: 0});
    return next(error);
  }

  res.status(201).json({payUser: createdPayUser.toObject({getters: true})});
};

const updatePayUser = async (req, res, next) => {
  PayUserDetails.findById(req.params.id)
    .then(payUser => {
      payUser.email = req.body.email;
      payUser.name = req.body.name;
      payUser.phone = req.body.phone;
      payUser.address = req.body.address;
      payUser.city = req.body.city;
      payUser.province = req.body.province;
      payUser.isSave = req.body.isSave;

      //exercise.duration = Number(req.body.duration);
      //exercise.date = Date.parse(req.body.date);
      /*try {
        console.log(payUser);
        await payUser.save();
        res.json({message: "Saved data to DB", save: 1});
      } catch (err) {
        const error = new HttpError("Saved failed, please try again.", 500);
        res.json({message: "Saved failed, please try again.", save: 0});
        return next(error);
      }

      res.status(201).json({payUser: payUser.toObject({getters: true})});*/

      payUser.save()
        .then(() => res.json({message: "Updated data to DB", save: 1}))
        .catch(err => res.status(400).json({message: "Updated failed, please try again.", save: 0}));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

const getPayUsers = async (req, res, next) => {
  PayUserDetails.find()
    .then(payUsers => res.json(payUsers))
    .catch(err => res.status(400).json('Error: ' + err));
};

const getPayUser = async (req, res, next) => {
  PayUserDetails.findById(req.params.id)
    .then(payUser => res.json(payUser))
    .catch(err => res.status(400).json('Error: ' + err));
};

const deletePayUser = async (req, res, next) => {

  PayUserDetails.findByIdAndDelete(req.params.id)
    .then(() => res.json({message: "Deleted data from DB", delete: 1}))
    .catch(err => res.status(400).json({message: "Deleted failed, please try again.", delete: 0}));

};


//------------------------------------Controller details for card-----------------------------------------------
const addPayCard = async (req, res, next) => {
  const {
    email,
    cardType,
    cardNumber,
    isSave
  } = req.body;


  const createdPayCard = new PayCardDetails({
    email,
    cardType,
    cardNumber,
    isSave
  });

  try {
    console.log(createdPayCard);
    await createdPayCard.save();
    res.json({message: "Saved data to DB", save: 1});
  } catch (err) {
    const error = new HttpError("Saved failed, please try again.", 500);
    res.json({message: "Saved failed, please try again.", save: 0});
    return next(error);
  }

  res.status(201).json({payCard: createdPayCard.toObject({getters: true})});
};

const updatePayCard = async (req, res, next) => {
  PayCardDetails.findById(req.params.id)
    .then(payCard => {
      payCard.email = req.body.email;
      payCard.cardType = req.body.cardType;
      payCard.cardNumber = req.body.cardNumber;
      payCard.isSave = req.body.isSave;

      payCard.save()
        .then(() => res.json({message: "Updated data to DB", save: 1}))
        .catch(err => res.status(400).json({message: "Updated failed, please try again.", save: 0}));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

const getPayCards = async (req, res, next) => {
  PayCardDetails.find()
    .then(payCards => res.json(payCards))
    .catch(err => res.status(400).json('Error: ' + err));
};

const getPayCard = async (req, res, next) => {
  PayCardDetails.findById(req.params.id)
    .then(payCard => res.json(payCard))
    .catch(err => res.status(400).json('Error: ' + err));
};

const deletePayCard = async (req, res, next) => {

  PayCardDetails.findByIdAndDelete(req.params.id)
    .then(() => res.json({message: "Deleted data from DB", delete: 1}))
    .catch(err => res.status(400).json({message: "Deleted failed, please try again.", delete: 0}));

};

exports.addPayUser = addPayUser;
exports.updatePayUser = updatePayUser;
exports.getPayUsers = getPayUsers;
exports.getPayUser = getPayUser;
exports.deletePayUser = deletePayUser;

exports.addPayCard = addPayCard;
exports.updatePayCard = updatePayCard;
exports.getPayCards = getPayCards;
exports.getPayCard = getPayCard;
exports.deletePayCard = deletePayCard;
