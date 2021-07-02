  
const { Router } = require('express');
const express = require('express');

const router = express.Router();

const discussionsController = require('../controllers/discussion_controller');

router.get('/:discussionId', discussionsController.getOneDiscussion);
router.post('/:discussionId', discussionsController.postComment);
router.delete('/:discussionId', discussionsController.deleteComment);
router.patch('/:discussionId', discussionsController.patchComment);
router.get('/', discussionsController.getDiscussions);
router.post('/', discussionsController.postDiscussions);
router.patch('/', discussionsController.patchDiscussion);
router.delete('/', discussionsController.deleteDiscussion);

module.exports = router;