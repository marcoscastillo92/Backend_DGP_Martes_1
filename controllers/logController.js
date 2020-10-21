const Log = require('../models/Log');

/**
 * Fn que añade un log a la BD
 * @author Marcos
 * @param {String} source Identificador del log, indica de que parte del código viene.
 * @param {String} message Descripción básica del log.
 * @param {Object} data Objeto para añadir información relevante al log para ver sus trazas.
 */
async function addLog(source, message, data){
    var log = await new Log({source: source, message: message, data: data});
    log.save(function(err, result){
        if(err){
            console.log("Log error: " +err);
        }
    });
}

module.exports = {
    addLog,
}