const { Router } = require('express');
const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments');

router.get('/', commentsController.getCommentsForDiscussion);
router.post('/', commentsController.postCommentForDiscussion);

module.exports = router;