const express = require("express");
const router = express.Router();

const { createPaymentIntent,getPaymentDetails } = require("../controllers/razorpay");
const { route } = require("./user");
// middleware
const { authCheck } = require("../middlewares/auth");

router.post("/create-payment-intent", authCheck, createPaymentIntent);
router.get("/get-payment-details/:paymentId", getPaymentDetails);
router.post("/verify/razorpay-signature",(req,res)=>{
    console.log("Body: ",JSON.stringify(req.body));
    var crypto = require('crypto');
    var hash = crypto.createHmac('SHA256', "abhikshil").update(JSON.stringify(req.body)).digest('hex');
    console.log("Claculated Hash:",hash);
    console.log("Razorpay Hash", req.headers['x-razorpay-signature']);
    if(hash === req.headers['x-razorpay-signature']){

    }
    else{
        
    }
    res.status(200).send();
});

module.exports = router;