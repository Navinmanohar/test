const express = require('express');
const authController = require('../Controller/authController');
const authMiddleware = require('../MiddleWare/authMiddleware');

const router = express.Router();

router.post('/signup', authController.signup);
router.get('/verify/:token',authMiddleware.verifyOpsUser, authController.verifyEmail);
router.post('/login', authMiddleware.verifyOpsUser,authController.login);

module.exports = router;
