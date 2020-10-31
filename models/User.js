const mongoose = require('mongoose');
var crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    username: {type: String, unique: true},
    password: {type: String},
    phoneNumber: {type: String},
    role: {type: String},
    birthDate: {type: Date},
    token: {type: String, unique: true, default: function(){
        return crypto.randomBytes(64).toString('hex');
    }},
    createdAt: {type: Date, default: Date.now},
    gender: {type: String},
});

/*
userSchema.methods.encriptaHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validaPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};*/

module.exports = mongoose.model('users', userSchema);