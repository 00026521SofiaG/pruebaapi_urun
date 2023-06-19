const { Router } = require("express");
const user = require("../models/user.model");

const controller = {};

controller.create = async (req, res) =>{
    const{nameUser,emailUser,passwordUser,pictureUser} = req.body;

}

//Crear otro modelo pero solo para la informacion del usuario e intentar enviar la informacion desde dos 
//modelos diferentes
//quiza debo de cambiar el require de el modelo