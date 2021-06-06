const { Router } = require('express');
const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');

router.get('/',usersController.getUsers);
router.get('/:userId',usersController.getUserById);
router.post('/',usersController.postUsers);

module.exports = router

