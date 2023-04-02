const express = require('express');
const router = express.Router();

import {
  createNewClinic,
  updateClinic,
  getClinicById,
  deleteClinic,
} from '../service/ClinicService';

class ClinicController {
  //[GET];
  async pageUpdateClinic(req, res, next) {
    let clinics = await getClinicById(req.params.id);

    let clinic = clinics[0];
    if (clinics) return res.render('admin/clinic_update', { clinic });

    return res.redirect('/back');
  }

  //[POST]
  async storeClinic(req, res, next) {
    if (!req.file) {
      req.body.image = '';
    } else {
      req.body.image = req.file.filename;
    }
    let formData = req.body;
    if (formData === null) return res.redirect('back');
    let newClinic = await createNewClinic(formData);
    if (!newClinic) return res.redirect('/error');
    res.redirect('/admin/clinic');
  }

  //[POST] UPDATE
  async changeClinic(req, res, next) {
    req.body.id = req.params.id;

    if (!req.file) {
      req.body.image = '';
    } else {
      req.body.image = req.file.filename
    }

    let clinic = await updateClinic(req.body);

    if (clinic) return res.redirect('/admin/clinic');

    return console.log('update fail');
  }

  async deleteClinic(req, res, next) {
    let clinic = await deleteClinic(req.params.id);

    if (clinic) return res.redirect('back');

    return console.log('delete fail');
  }

  async pageInfoClinic(req, res, next) {
    let clinics = await getClinicById(req.params.id);

    let clinic = clinics[0];
    let doctors = clinics[1];
    if (clinics) return res.render('admin/clinic_info', { clinic, doctors });

    return res.redirect('/back');
  }
}

module.exports = new ClinicController();
