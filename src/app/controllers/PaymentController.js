const express = require('express');
const paypal = require('paypal-rest-sdk');
const router = express.Router();
import { updateAccountBalance } from '../service/PaymentService';
import { getUserById } from '../service/UserService';

paypal.configure({
  mode: 'sandbox',
  client_id: 'AfX4fdY93QBgkabu_RJYEyyg3M7tnUGtdXtusY4ntea9vav8MD7Vc1x5v0ibm-AaH_ODxwVN8cv9k3m8',
  client_secret: 'EN1j3n7JIlizyM0WrV4rJmzS-ZWAySmXo9qzb3zq5xFrzXb0lCno3bbaK-B2WnMeb8kYuU_vBRIgeq6n',
});

let fund = 0;

class PaymentController {
  index(req, res, next) {
    // let user = await getUserById(req.session.userID)
    // console.log(user);
    res.render('user/payment');
  }

  createNewPayment(req, res, next) {
    fund = req.body.amount;
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:4000/payment/success',
        cancel_url: 'http://localhost:4000/payment/cancel',
      },
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: fund,
          },
          description: 'Add fund into account.',
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  }

  async executePayment(req, res, next) {
    const execute_payment_json = {
      payer_id: req.query.PayerID,
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: fund,
          },
        },
      ],
    };

    const paymentID = req.query.paymentId;

    paypal.payment.execute(paymentID, execute_payment_json, (error, payment) => {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        // console.log(checkAccountBalance("20d6f7e9-ec75-44e3-9237-ccaa105e2c30"))
        updateAccountBalance(req.session.userID, parseInt(fund));
        res.render('payment/success');
      }
    });
  }
}

module.exports = new PaymentController();
