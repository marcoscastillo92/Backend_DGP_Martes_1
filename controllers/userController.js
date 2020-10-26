const User = require('../models/User');
const Logger = require('./logController');
var bcrypt = require('bcrypt');

//Correlaciones de campos del objeto usuario
const neededUserFields = ["name","username","password","role"];
const allUserFields = ["name","username","password","role","email","phoneNumber","birthDay"];

const neededUserLoginFields = ["username","password"];
const allUserLoginFields = ["username","password"];


function correctFields(req, res, neededFields, allFields){
    missingFields = Array();
    extraFields = Array();
    //Comprobación de campos mínimos necesarios
    neededFields.forEach(function(element){
        //console.log("Elemento: " + eval('req.body.'+element));
        if(!eval('req.body.'+element)){
            missingFields.push(element);

        }
    });

    //Comprobación de campos extras añadidos
    for(var key in req.body){
        if(!allFields.includes(key)){
            extraFields.push(key);
        }
    }
    
    if(missingFields.length > 0){
        //console.log("MISSING FIELDS: " + missingFields);
        msgErr = {"error" : "Missing fields", "missing_fields" : missingFields};
        Logger.addLog('userController', 'Creation missing fields', {'missingFields': missingFields, 'requestBody': req.body});
        res.send(msgErr);
    }else if(extraFields.length > 0){
        msgErr = {"error" : "Extra fields", "extra_fields" : extraFields};
        Logger.addLog('userController', 'Creation extra fields', {'extraFields': extraFields, 'requestBody': req.body});
        res.send(msgErr);
    }else{
        return true;
    }

    return false;
}
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
        Logger.addLog('userController', 'User not found', {'id': id, 'requestParams': req.params});
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
   if(correctFields(req, res, neededUserFields, allUserFields)){
        var userData = req.body;
        userData.role = userData.role.toLowerCase();
        userData.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(10));
        var newUser = await new User(userData);
        newUser.save((err, result) =>{
            if(err) Logger.addLog('userController', 'Creation error', {'error': err, 'userObject': result, 'requestBody': userData});
            else Logger.addLog('userController', 'User created', {'userObject': result, 'requestBody': userData});
        });
        res.send(newUser);
    }
}


async function userLogin(req, res){
    if(correctFields(req, res, neededUserLoginFields, allUserLoginFields)){
        var userData = req.body;
        var userFromBD = await User.findOne({ username: userData.username })
        
        if (bcrypt.compareSync(userData.password, userFromBD.password)){
            var response = {result: "success", token: userFromBD.token}
            req.session.user = userFromBD;
            req.session.token = response.token;
            res.send(response)
        }else{
            var response = {result: "error", message: "User not registred"}
            res.send(response)
        }
    }
}

module.exports = {
    getUserInfoById,
    createUser,
    userLogin,
}


