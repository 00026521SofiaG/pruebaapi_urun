const { Router } = require("express");
const user = require("../models/user.model");

const controller = {};

controller.getUser = (req, res) => {
    const {user} = req;
    if(!user){
        return res.status(404).json({
            error: 'User not found'
        });
    }
    return res.status(200).json({...user._doc, validTokens: undefined});

};

module.exports = controller;
