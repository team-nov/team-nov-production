const { Router } = require('express');
const express = require('express');

const router = express.Router();

const videosController = require('../controllers/video_controller');

router.get('/', videosController.getVideos);
router.post('/', videosController.postVideo);
router.delete('/', videosController.deleteVideo);
router.patch('/', videosController.patchVideo);
router.get('/search/:query',videosController.searchVideos);
router.get('/:videoId', videosController.getVideoById);
router.post('/:videoId', videosController.postComment);
router.delete('/:videoId', videosController.deleteComment);
router.patch('/:videoId', videosController.patchComment);

module.exports = router
