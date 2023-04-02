var express = require('express');
var router = express.Router();
let multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});

const PaymentController = require('../app/controllers/PaymentController');

router.post('/pay', PaymentController.createNewPayment);
router.get('/success', PaymentController.executePayment);
router.use('/', PaymentController.index);

module.exports = router;
