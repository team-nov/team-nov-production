const express = require('express');

const router = express.Router();

const dmsController = require('../controllers/dms');

router.get('/',dmsController.getDms);
router.get('/:dmId',dmsController.getDmsById);
router.post('/',dmsController.postDms);

module.exports = router
