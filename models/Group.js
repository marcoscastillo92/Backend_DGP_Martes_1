const mongoose = require('mongoose');
var User = require('User');

const groupSchema = new mongoose.Schema({
    name: {type: String},
    memberCount: {type: String},
    category: {type: String},
    users: [User],
    createdAt: {type: Date, default: Date.now}
});

/*
userSchema.methods.encriptaHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

GRUPOS
PEPITO idPepito 15265
RAMON idPepito 15265
MARIA  idMaria 456465
DAVID  idDavid 5456
ANA  idAna 5456
SILVIA  idSilvia 5456

GRUPO
TAL 15265 fecha numMiembros
FOL 456465 fecha numMiembros
ASCI 5456 fecha numMiembros

userSchema.methods.validaPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};*/

module.exports = mongoose.model('groups', groupSchema);