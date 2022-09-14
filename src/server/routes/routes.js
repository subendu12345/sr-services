const express = require('express')
const router = express.Router();
const dealerTemplateCopy = require('../models/DealerModel')
const orderTemplateCopy = require('../models/OrderModel')

router.post('/signup',(req, res)=>{
    if(req.body){
        const signupDealer = new dealerTemplateCopy({
            DealerName : req.body.DealerName,
            ShopName : req.body.ShopName || '',
            Address : req.body.DealerAddress || '',
            Email : req.body.DealerEmail || '',
            PhoneNumber : req.body.DealerPhoneNumber || ''
        })
        signupDealer.save()
        .then(data=>{
            res.send(data)
        }).catch(err=>{
            console.log('data from err  ', err);
            res.send(err)
        })
    } 
})

router.post('/save-order', (req, res)=>{
    if(req.body){
        const saveOrder = new orderTemplateCopy({
            DealerId : req.body.DealerId,
            IsDelivered : req.body.IsDelivered,
            ItemsName : req.body.ItemsName,
            OrderDate : req.body.OrderDate,
            TotalAmount : req.body.TotalAmount.toString(),
            TotalPaid : req.body.TotalPaid.toString(),
            DeliveredDate : req.body.DeliveredDate
        })
        saveOrder.save()
        .then(data=>{
            res.send(data)
        }).catch(err=>{
            console.log('data from err  ', err);
            res.send(err)
        })
    }
})

router.get('/dealer', function(req, res) {
    dealerTemplateCopy.find({}, (err, dealers)=>{
        if (!err) {
            res.send(dealers)
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    })
});

router.get('/get-orders', function(req, res) {
    orderTemplateCopy.find({}, (err, orders)=>{
        if (!err) {
            res.send(orders)
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    })
});

router.get('/signin', (req, res)=>{
    res.send('signin call');
})

module.exports = router;