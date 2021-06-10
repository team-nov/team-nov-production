const { Router } = require('express');
const express = require('express');

const router = express.Router();

const videosController = require('../controllers/video_controller');

router.get('/', videosController.getVideos);
router.get('/:videoId', videosController.getVideoById);
router.post('/', videosController.postVideos);
router.post('/:videoId', videosController.postCommentsByVideoId);

module.exports = router
