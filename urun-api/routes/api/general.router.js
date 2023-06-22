const express = require("express");
const router = express.Router();

//route import
const userRouter = require("./user.router");

//Defining routes
router.use("/user", userRouter);

module.exports = router;