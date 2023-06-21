const mongoose = require('mongoose');
const helper = {};

helper.verifyID = (user_id) => {
    if(!user_id){
        return false;
    }
    return mongoose.Types.ObjectId.isValid(user_id);
}

module.exports = helper;