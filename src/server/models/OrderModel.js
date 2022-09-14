const mongoose = require('mongoose')

const orderTemplate = new mongoose.Schema({
    IsDelivered :{
        type : Boolean,
        default : false
    },
    OrderDate :{
        type : String,
        trim:true
    },
    ItemsName :{
        type : String,
        trim:true
    },
    TotalAmount:{
        type : String,
        default : ''
    },
    TotalPaid :{
        type : String,
        default : ''
    },
    DeliveredDate :{
        type : String,
        trim : true
    },
    DealerId :{
        type : String,
        trim : true
    }

})

module.exports = mongoose.model('Order', orderTemplate);