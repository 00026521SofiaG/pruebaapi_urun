const{verifyToken} = require('../helpers/jwtUtil');
const {verifyID} = require('../helpers/mongo.helper');
const Validator = require('../validators/user.validator');

const middleware = {};

middleware.verifyAuth = async(req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(403).json({
            error: 'Authorization is required'
        });
    }

    const tokenObj = verifyToken(token);
    if(!tokenObj){
        return res.status(401).json({
            error: 'Invalid Token'
        });
    }

    const userID = tokenObj.user_id;
    if(!verifyID(userID)){
        return res.status(400).json({
            error: 'Wrong ID'
        });
    }

    const userExist = await Validator.findById(userID);
    if(!userExist.success){
        return res.status(404).json(userExist.content);
    }

    const User = userExist.content;

    const indexOfToken = User.validTokens.findIndex((userToken) => userToken === token);
    if(indexOfToken < 0){
        return res.status(403).json({
            error: 'Unregistered token'
        });
    }

    req.user = User;
    next();
};

module.exports = middleware;

