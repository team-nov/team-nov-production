const { Router } = require('express');
const express = require('express');

const router = express.Router();

const usersController = require('../controllers/user_controller');

// Added user schema for registration
router.get('/login/:username,:password', usersController.userLogin);
router.get('/:userId',usersController.getUserById);
router.get('/',usersController.getUsers);
router.get('/:userId', usersController.getUserById);
router.post('/',usersController.postUsers);

module.exports = router

