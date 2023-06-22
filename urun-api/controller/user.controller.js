const { Router } = require("express");
const User = require("../models/user.model");

const controller = {};

controller.register = async(req,res) => {
    const {nameUser, emailUser,passwordUser,pictureUser} = req.body;

    //creates the new user
    const user = new User({nameUser, emailUser,passwordUser,pictureUser});
    
    //Verifying if the user already exisist
    const emailExists = await User.findOne({emailUser});

    if(emailExists){
        return res.status(400).json({
            msg: "This email is already in use."
        });
    }

    await user.save();

    res.status(201).json({
        msg: "User created succesfully."
    })
}

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
