const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    username: {type: String},
    password: {type: String},
    phoneNumber: {type: String},
    role: {type: String},
    birthDate: {type: Date},
    token: {type: String},
    createdAt: {type: Date, default: Date.now}
});

/*
userSchema.methods.encriptaHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validaPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};*/

module.exports = mongoose.model('users', userSchema);