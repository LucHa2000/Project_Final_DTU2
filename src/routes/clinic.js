const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});

const clinicController = require('../app/controllers/ClinicController');

router.get('/delete/:id', clinicController.deleteClinic);
router.get('/:id', clinicController.pageUpdateClinic);
router.get('/:id/info', clinicController.pageInfoClinic);
router.post('/storeClinic', upload.single('image'), clinicController.storeClinic);
router.post('/:id/edit', upload.single('image'), clinicController.changeClinic);

module.exports = router;
