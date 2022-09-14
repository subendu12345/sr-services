const mongoose = require('mongoose')

const signupTemplate = new mongoose.Schema({
    FullName :{
        type : String,
        required : true,
        trim:true
    },
    UserName :{
        type : String,
        required : true,
        trim:true
    },
    Email :{
        type : String,
        required : true,
        trim:true
    },
    Password :{
        type : String,
        required : true,
        trim:true
    },
    CreatedDate :{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User', signupTemplate);