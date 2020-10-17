const { json } = require('express');
var express = require('express');
const User = require('../models/User');
var router = express.Router();

//Correlaciones de campos del objeto usuario
const neededUserFields = ["name","username","password","role"];
const allUserFields = ["name","username","password","role","email","phoneNumber","birthDay"];

/**
 * @author Jose
 * @params: User es el objeto usuarioq ue se obntiene de la bd
 * @return: retorna el JSON con el objeto Usuario.
 */
async function getUserInfoById(req, res) {
    var id = req.params.id;
    try{
        var user = await User.findById(id);
    }catch{
        user = {"error": "UserNotFound"};
    }
    res.send(user);
}

/**
 * Fn que crea un usuario con unos datos mínimos especificados
 * @author Marcos
 * @param {*} req
 * @param {*} res
 * @return new user object or json with missing fields
 */
async function createUser(req, res){
    missingFields = Array();
    extraFields = Array();
    //Comprobación de campos mínimos necesarios
    neededUserFields.forEach(function(element){
        //console.log("Elemento: " + eval('req.body.'+element));
        if(!eval('req.body.'+element)){
            missingFields.push(element);
        }
    });

    //Comprobación de campos extras añadidos
    for(var key in req.body){
        if(!allUserFields.includes(key)){
            extraFields.push(key);
        }
    }
    
    if(missingFields.length > 0){
        //console.log("MISSING FIELDS: " + missingFields);
        msgErr = {"error" : "Missing fields", "missing_fields" : missingFields};
        res.send(msgErr);
    }else if(extraFields.length > 0){
        msgErr = {"error" : "Extra fields", "extra_fields" : extraFields};
        res.send(msgErr);
    }else{
        var newUser = await new User(req.body)
        newUser.save();
        res.send(newUser);
    }
}

module.exports = {
    getUserInfoById,
    createUser,
}