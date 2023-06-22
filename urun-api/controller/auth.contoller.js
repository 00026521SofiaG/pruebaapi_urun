const User = require("../models/user.model");
const debug = require("debug")("app:auth-contoller");
const {createToken, verifyToken} = require("../helpers/jwtUtil");

const controller = {};

//Registering user
controller.register = async (req, res) => {
    try {
        //Getting the user information
         const {nameUser,emailUser,passwordUser} = req.body;

         //Verifying that the username or email doesnt exists already
          const user = await User.findOne({ $or: [{nameUser: nameUser}, {emailUser:emailUser}]});

        if(user){
            return res.status(409).json({error: "This user is already in use."});
        }  
 
        //debug({nameUser,emailUser,passwordUser});

        const newUser = new User({
            nameUser: nameUser,
            emailUser: emailUser,
            passwordUser: passwordUser
        });

        await newUser.save();

        return res.status(201).json({message: "User created successfully"})
    }catch (error){
        debug({error});
        return res.status(500).json({error: "Unexpected error"})
    }
}

controller.login = async (req, res) => {
    try{
        const {identifier, passwordUser} = req.body;
        
        //Verifying if the user exists
        const user = await User.findOne({$or: [{nameUser: identifier}, {emailUser: identifier}]});
        if(!user){
            return res.status(404).json({error: "This user does not exists"});
        }
        if(!user.comparePassword(passwordUser)){
            return res.status(401).json({error: "The password does not match"});
        }

        //Loging in
        const token = createToken(user._id);
        user.tokens = [token, ...User.tokens.filter(_token => verifyToken(_token)).splice(0,4)];
        await user.save();

        //Registers the user tokens
        return res.status(200).json({token: token});
    }catch (error) {
        debug(error);
        return res.status(500).json({error: "Unexpected error"})
    }
}

controller.whoami = async (req,res) => {
    try{
        const{_id, nameUser, emailUser} = req.user;
        return res.status(200).json({_id, nameUser,emailUser});
    }catch (error){
        debug(error);
        return res.status(500).json({ error: "Unexpected error"})
    }
}

module.exports = controller;
