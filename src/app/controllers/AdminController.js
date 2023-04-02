const express = require('express');
const router = express.Router();

import { getListAccounts } from '../service/AccountService';
import { getListClinics } from '../service/ClinicService';
import {
  getAllTransactionHistory
} from "../service/TransactionHistoryService";
class AdminController {
  async index(req, res, next) {
    let transactionHistory = await getAllTransactionHistory();
      let sum = transactionHistory.reduce((acc,value)=> {
        return acc + ((parseInt(value.balance)*30)/100)
      },0)
    res.render('admin/home',{transactionHistory : transactionHistory, totalPayment : sum});
  
}
  async PickStatisticsPage(req,res,next){
    console.log(req.body)
  }
  async accountPage(req, res, next) {
    let accountsAndClinics = await getListAccounts();
    let accounts = accountsAndClinics[0];
    let clinics = accountsAndClinics[1];
    res.render('admin/account_view', { accounts, clinics });
  }

  async clinicPage(req, res, next) {
    try {
      let clinics = await getListClinics();
      res.render('admin/clinic_view', {
        clinics,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new AdminController();
