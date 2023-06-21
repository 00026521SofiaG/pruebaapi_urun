const Validator = require("../validators/user.validator");
const {createToken} = require("../helpers/jwtUtil");
const { json } = require("express");

//Register controller
const register = async (req, res) => {
    const fielValidator = Validator.verifyRegisterFields(req.body);
    if(!fielValidator.success){
        return res.status(400).json(fielValidator.content);

    }
    try{
        const {username, userEmail} = req.body;

        //Verifying if the user already exists
        const userVerify = await Validator.findByUsernameEmail(username,userEmail);
        if(userVerify.success){
            return res.status(409).json({
                error: 'User already exists'
            });
        }
        //Registering user
        const userRegister = await Validator.register(req.body);
        if(!userRegister.success){
            return res.status(409).json(userRegister.content);
        }
        return res.status(201).json(userRegister.content);
    }catch(e){
        return res.status(500).json({
            error: 'Server error'
        });
    }
     
};

//Login controller
const login = async(req, res) => {
    const fielValidator = Validator.verifyLoginFields(req.body);
    if(!fielValidator.success){
        return res.status(400).json(fielValidator.content);
    }
    try{
        const {identifier, password} = req.body;
        //searching via username or email
        const userVerify = await Validator.findByUsernameEmail(identifier, identifier);
        if(!userVerify.success){
            return res.status(404).json(userVerify.content);
        }

        const User = userVerify.content;

        if(!User.comparePassword(password)){
            return res.status(401).json({
                error: 'Wrong password'
            });
        }

        const token = createToken(User.user_id);

        const tokenRegistered = await Validator.loginToken(User, token);
        if(!tokenRegistered.success){
            return res.status(409).json(tokenRegistered.content);
        }

        //Returning token
        return res.status(200).json({
            token: token
        });


    }catch(e){
        return res.status(500).json({
            e: 'Server Error'
        });
    }

};

module.exports = {register, login};
