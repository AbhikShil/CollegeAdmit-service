const User = require("../models/user");
const Cart = require("../models/cart");
const College = require("../models/college");
const Coupon = require("../models/coupon");
// const coupon = require("../models/coupon");
const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY_ID,
});

exports.createPaymentIntent = async (req, res) => {
  // console.log(req.body);
  const { couponApplied } = req.body; 

  // later apply coupon
  // later calculate price

  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec();
  // 2 get user cart total
  const { colleges ,cartTotal, totalAfterDiscount } = await Cart.findOne({ 
    orderdBy: user._id,
  }).exec();
  // console.log("CART TOTAL", cartTotal, "AFTER DIS%", totalAfterDiscount);


  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = cartTotal * 100;
  }


finalAmount=Math.floor(finalAmount);
  // create payment intent with order amount and currency


  var options = {
    amount: finalAmount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: user._id,
    notes: [],
  };
  instance.orders.create(options, function(err, order) {
    if(err){
      console.log(err);
      res.status(500).json(err);
    }
    else{
      res.json(order);
    }
  });

  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: finalAmount,
  //   currency: "usd",
  // });

  // res.send({
  //   clientSecret: paymentIntent.client_secret,
  //   cartTotal,
  //   totalAfterDiscount,
  //   payable: finalAmount,
  // });
};


exports.getPaymentDetails = async(req,res) =>{
  const paymentId= req.params.paymentId;
  console.log("Payment Id:",paymentId)
  const pdata = instance.payments.fetch(paymentId).then((response) => {
    // handle success
    res.json(response);
  }).catch((error) => {
    // handle error
    console.log(error);
  })
}