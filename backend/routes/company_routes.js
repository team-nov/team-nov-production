const { Router } = require('express');
const express = require('express');

const router = express.Router();

const companyController = require('../controllers/company_controller');

router.post('/', companyController.postCompany);

module.exports = router
