const express = require('express')
const router = express.Router();
const dealerTemplateCopy = require('../models/DealerModel')

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


router.get('/dealer', function(req, res) {
    dealerTemplateCopy.find({}, (err, dealers)=>{
        if (!err) {
            res.send(dealers)
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    })
    

});

router.get('/signin', (req, res)=>{
    res.send('signin call');
})

module.exports = router;