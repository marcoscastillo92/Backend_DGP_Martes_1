const mongoose = require('mongoose');
var crypto = require('crypto');

const pictogramSchema = new mongoose.Schema({
    name: {type: String},
    key: {type: String},
    value: {type: String},
    section: {type: String}
});

/*
userSchema.methods.encriptaHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validaPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};*/

module.exports = mongoose.model('pictograms', pictogramSchema);