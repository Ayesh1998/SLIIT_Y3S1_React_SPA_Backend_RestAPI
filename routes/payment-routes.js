const express = require('express');
const router = express.Router();

const PaymentsController = require('../controller/payment-controller');

router.post('/pay-user', PaymentsController.addPayUser);
router.post('/pay-user/update/:id', PaymentsController.updatePayUser);
router.get('/pay-user', PaymentsController.getPayUsers);
router.get('/pay-user/:id', PaymentsController.getPayUser);
router.delete('/pay-user/:id', PaymentsController.deletePayUser);

router.post('/pay-card', PaymentsController.addPayCard);
router.post('/pay-card/update/:id', PaymentsController.updatePayCard);
router.get('/pay-card', PaymentsController.getPayCards);
router.get('/pay-card/:id', PaymentsController.getPayCard);
router.delete('/pay-card/:id', PaymentsController.deletePayCard);

module.exports = router;
