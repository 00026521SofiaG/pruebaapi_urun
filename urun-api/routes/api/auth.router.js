const express = require('express');
const router = express.Router();

const authController = require('../../controller/auth.contoller');

router.post('/register', authController.register);
router.post('/signin', authController.login);

module.exports = router;