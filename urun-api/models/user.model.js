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
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    "calculoCalorias": [
        {
            "altura": {
                type : Int32,
                require: true,
                trim: true
            },
            "peso" : {
                type : Int32,
                require: true,
                trim: true

            }
        }
    ],
    "objetivo" : [
        {
            "distancia" : {
                type : Int32,
                require: true,
                trim: true
            },
            "calorias": {
                type : Int32,
                require: true,
                trim: true
            },
            "veces" : {
                type : Int32,
                require: true,
                trim: true
            }
        }
    ]

});

module.exports = Mongoose.model("user", userSchema);