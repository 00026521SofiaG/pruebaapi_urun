const express = require("express");
const router = express.Router();

const usuarioController = require("../../controller/user.controller");
 router.get('/', usuarioController.getUser);

 module.exports = router;