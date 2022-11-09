const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    gender: String,
    status: String,
},{timestamps: true},)

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;