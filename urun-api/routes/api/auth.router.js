const express = require('express');
const router = express.Router();

const authController = require('../../controller/auth.contoller');
const {registerValidator} = require('../../validators/auth.validator');
const {authentication} = require('../../middlewares/auth.middleware');

router.post('/signup', registerValidator,authController.register);
router.post('/signin', authController.login);
router.get("/whoami",  authController.whoami);

module.exports = router;