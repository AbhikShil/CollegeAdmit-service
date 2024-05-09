const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    colleges: [
      {
        college: {
          type: ObjectId,
          ref: "College",
        },
        count: Number,
        price: Number,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Payment Succesfull. Profile Under Verification",
      enum: [
        "Payment Succesfull. Profile Under Verification",
        "Admin Approved Profile. Waiting For College Approval",
        "Profile Eligible .Seat Is Successfully Booked.",
        "Profile On Hold. Please Update Your Profile.",
        "Profile Rejected. Apply Again!"
      ],
    },
    orderdBy: { type: ObjectId, ref: "User" },
    userData: {
      type: Array,
    },
    comment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
