const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const collegeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    fees: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    seats: {
      type: Number,
      default: 0,
    },

    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },

    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    seatType: {
      type: String,
      enum: ["CET", "Management", "Comed-k", "College Exam"],
    },
    // brand: {
    //   type: String,
    //   enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    // },
    // ratings: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: "User" },
    //   },
    // ],
    quantity: Number,
    ratings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);
