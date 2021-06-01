const { Router } = require('express');
const express = require('express');

const router = express.Router();

const discussionsController = require('../controllers/discussions');

router.get('/', discussionsController.getDiscussions);
router.post('/', discussionsController.postDiscussions);

module.exports = router;