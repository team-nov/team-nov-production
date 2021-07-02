const { Router } = require('express');
const express = require('express');

const router = express.Router();

const usersController = require('../controllers/user_controller');

// Added user schema for registration
router.post('/login/', usersController.userLogin);
router.get('/:userId',usersController.getUserById);
router.get('/',usersController.getUsers);
router.post('/',usersController.postUsers);

module.exports = router

