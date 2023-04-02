const express = require('express');
const router = express.Router();

import {
  changeAccStatus,
  createNewAccount,
  updateAccount,
  getAccountById,
  deleteAcc,
} from '../service/AccountService';

class AccountController {
  //[GET];
  async pageUpdate(req, res, next) {
    let account = await getAccountById(req.params.id);

    let acc = account[0];
    let clinicOfDoctor = account[1];
    let clinics = account[2];
    let serviceOfDoctor = account[3];
    if (acc.roleID == 2) {
      acc.fee = serviceOfDoctor['fee'];
    } else {
      acc.fee = '';
    }

    if (account)
      if (acc.roleID == 2) {
        return res.render('admin/account_update', {
          account: acc,
          clinicOfDoctor,
          clinics,
        });
      } else {
        return res.render('admin/account_update', {
          account: acc,
          clinicOfDoctor,
          clinics,
        });
      }

    return res.redirect('/back');
  }

  //[POST]
  async storeAccount(req, res, next) {
    let formData = req.body;

    if (formData === null) return res.redirect('back');

    let newAccount = await createNewAccount(formData);

    if (!newAccount) return res.redirect('/error');

    res.redirect('/admin/account');
  }

  //[POST] UPDATE
  async newAccount(req, res, next) {
    req.body.id = req.params.id;

    let accountUpdate = await updateAccount(req.body);

    if (accountUpdate) return res.redirect('/admin/account');

    return console.log('update fail');
  }

  async deleteAccount(req, res, next) {
    let acc = await deleteAcc(req.params.id);

    if (acc) return res.redirect('back');

    return console.log('delete fail');
  }

  changeStatus(req, res, next) {
    req.body.id = req.params.id;

    let changeAcc = changeAccStatus(req.body);

    if (changeAcc) return res.redirect('back');

    return console.log('change fail');
  }
}

module.exports = new AccountController();
