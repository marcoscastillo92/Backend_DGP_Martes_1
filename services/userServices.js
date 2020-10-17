const { json } = require('express');
var express = require('express');
const User = require('../models/User');
var router = express.Router();

/**
 * @author: Jose
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

module.exports = {
    getUserInfoById,
}