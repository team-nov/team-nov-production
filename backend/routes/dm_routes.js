const express = require('express');

const router = express.Router();

const dmsController = require('../controllers/dm_controller');

router.get('/',dmsController.getDms);
router.get('/byUserId/:userId',dmsController.getDmsByUserId);
router.get('/:dmId',dmsController.getDmById);
router.post('/',dmsController.postDm);
router.post('/messages',dmsController.postDmMessage);
router.delete('/messages',dmsController.deleteDmMessage);
router.delete('/',dmsController.deleteDm);
router.patch('/:dmId',dmsController.patchDm);


module.exports = router
