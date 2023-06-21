const User = require('../models/user.model');

const serviceResponse = {
    success: true,
    content: {}
};

//Verifying that the information isn't empty 
const verifyRegisterFields = ({nameUser, emailUser,passwordUser}) => {
    if(!nameUser || emailUser || passwordUser){
        serviceResponse = {
            success: false,
            content: {
            error: 'This information is required'
            }
        };
        return serviceResponse;
    }
    return serviceResponse;
};

//Veriying user registration
const register = async({nameUser, emailUser, passwordUser}) => {
    let registerResponse = {
        success: true,
        content: {
            message: 'User already register.'
        }
    };
    try{
        const user = new User({
            nameUser,
            emailUser,
            passwordUser
        });

        const saveUser = await user.save();
        if(!saveUser) {
            registerResponse = {
                success: false,
                content: {
                    message: 'User not registered'
                }

            };
        }
        return registerResponse
    } catch(e) {
        console.log(e);
        throw new Error('Server Error');
    }

};

//Verifying that the information isn't empty for login
const verifyLoginFields = ({userEmail, passwordUser}) => {
    if(!userEmail|| !passwordUser){
        serviceResponse = {
            success: false,
            content: {
                error: 'Required fields are empty'
            }
        };
        return serviceResponse;
    }
    return serviceResponse;
};
//Creates token when user logsin
const loginToken = async(nameUser, token) => {
    try{
        nameUser.validTokens.push(token);

        const updateUser = await nameUser.save();
        if(!updateUser){
            serviceResponse = {
                success: false,
                content: {
                    error: 'Token not registered.'
                }
            };
        } 
        return serviceResponse;  
    }catch(e){
        throw e;
    }
}


//Searches user by user name or email
const findByUsernameEmail = async(nameUser, emailUser) =>{
    try{
        const user = await User.findOne({
            $or: [{ nameUser: nameUser}, {emailUser:emailUser}]
        }).exec();
        if(!user){
            serviceResponse = {
                success: false,
                content: {
                    error: 'User not found'
                }
            };
        }else{
            serviceResponse.content = user;
        }
        return serviceResponse;
    }catch(e) {
        throw new Error('Server error.');
    }

};

//Searches user by it's id
const findById = async(user_id) => {
    try{
        const user = await User.findById(user_id).select('-passwordUser').exec();

        if(!user){
            serviceResponse = {
                success: false,
                content: {
                    error: 'User not found'
                }
            };
        }else {
            serviceResponse.content = user;
        }
        return serviceResponse;
    }catch(e) {
        throw new Error('Server error.');
    }
};

module.exports= {verifyRegisterFields,verifyLoginFields,register,loginToken,findByUsernameEmail,findById};

