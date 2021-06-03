const express = require('express');

const router = express.Router();

const dmsController = require('../controllers/dms');

router.get('/',dmsController.getDms);
router.get('/:dmId',dmsController.getDmById);
router.post('/',dmsController.postDm);
router.post('/messages',dmsController.postDmMessage);
router.delete('/messages',dmsController.deleteDmMessage);
router.delete('/',dmsController.deleteDm);
router.patch('/:dmId',dmsController.patchDm);


module.exports = router
