const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    "nameUser": {
        type: String,
        require: true,
        trim: true
    },
    "emailUser": {
        type: String,
        require: true,
        trim: true
    },
    "passwordUser": {
        type: String,
        require: true,
        trim: true
    },
    "pictureUser": {
        type:String
    },

    "validTokens": [ String],
    
    "calculoCalorias": [
        {
            "altura": {
                type : String,
                require: true,
                trim: true
            },
            "peso" : {
                type : String,
                require: true,
                trim: true

            }
        }
    ],
    "objetivo" : [
        {
            "distancia" : {
                type : String,
                require: true,
                trim: true
            },
            "calorias": {
                type : String,
                require: true,
                trim: true
            },
            "veces" : {
                type : String,
                require: true,
                trim: true
            }
        }
    ]

});

userSchema.methods = {
    comparePassword: function(password){
        return Crypto.createHmac('sha256', password).digest('hex') === this.passwordUser;
    }
};

module.exports = Mongoose.model("user", userSchema);