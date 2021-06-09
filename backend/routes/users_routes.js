const { Router } = require('express');
const express = require('express');

const router = express.Router();

const usersController = require('../controllers/user_controllers');

// router.get('/',usersController.getUsers);
router.post('/',usersController.postUsers);

module.exports = router

