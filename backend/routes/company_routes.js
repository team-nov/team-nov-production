const { Router } = require('express');
const express = require('express');

const router = express.Router();

const companyController = require('../controllers/company_controller');

router.get('/', companyController.getCompanies);
router.patch('/updateCompany/', companyController.updateCompanyInfo)
router.get('/:companyId',companyController.getCompanyById);
router.post('/', companyController.postCompany);

module.exports = router
