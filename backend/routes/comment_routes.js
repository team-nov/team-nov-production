const { Router } = require('express');
const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comment_controller');

router.get('/', commentsController.getComments);
router.post('/', commentsController.postCommentForDiscussion);

module.exports = router;