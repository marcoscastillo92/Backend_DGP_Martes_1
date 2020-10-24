const mongoose = require('mongoose');
var crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    username: {type: String},
    password: {type: String},
    phoneNumber: {type: String},
    role: {type: String},
    birthDate: {type: Date},
    token: {type: String, default: this.generateToken},
    createdAt: {type: Date, default: Date.now}
});

/*
userSchema.methods.encriptaHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validaPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};*/

userSchema.method.generateToken = function(){
    token = crypo.randomBytes(64).toString('hex');
    var user = this.find({'token' : token});
    if(user) return token;
    else this.generateToken;
}
module.exports = mongoose.model('users', userSchema);