const express = require('express');
const fileController = require('../Controller/fileController');
const authMiddleware = require('../MiddleWare/authMiddleware');



const router = express.Router();

router.post('/upload', authMiddleware.verifyOpsUser, fileController.uploadFile);
router.get('/download/:fileId/:encryptedFilePath', authMiddleware.verifyClientUser, fileController.downloadFile);
router.get('/list', authMiddleware.verifyOpsUser, fileController.listFiles);

module.exports = router;