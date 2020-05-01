const express = require('express');
const router = express.Router();

const UsersController = require('../controller/user-controller');

router.post('/signup', UsersController.signup);
router.post('/login', UsersController.login);
router.post('/updatePasswordRequest', UsersController.updatePasswordRequest);
router.post('/updatePassword', UsersController.updatePassword);

module.exports = router;
