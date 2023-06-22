const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const usuarioController = require("../../controller/user.controller");
 router.get('/', usuarioController.getUser);
 
 router.post("/" , [
    check("nameUser", "Name is required.").not().isEmpty(),
    check("emailUser", "Email is requiered").isEmail(),
    check("passwordUser", "Password is required")
 ],usuarioController.register );

 module.exports = router;