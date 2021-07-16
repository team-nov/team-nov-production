const { Router } = require('express');
const express = require('express');

const router = express.Router();

const interestController = require('../controllers/interest_controller');

// Added user schema for registration
router.get('/',interestController.getInterests);
router.post('/',interestController.postInterests);


module.exports = router

