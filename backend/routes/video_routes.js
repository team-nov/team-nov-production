const { Router } = require('express');
const express = require('express');

const router = express.Router();

const videosController = require('../controllers/video_controller');

router.get('/', videosController.getVideos);
router.post('/', videosController.postVideos);

module.exports = router
