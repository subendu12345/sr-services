const mongoose = require('mongoose')

const dealerTemplate = new mongoose.Schema({
    DealerName :{
        type : String,
        required : true,
        trim:true
    },
    ShopName :{
        type : String,
        required : true,
        trim:true
    },
    Address :{
        type : String,
        required : true,
        trim:true
    },
    Email :{
        type : String,
        trim:true
    },
    PhoneNumber:{
        type : String,
        trim:true
    },
    CreatedDate :{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Dealer', dealerTemplate);