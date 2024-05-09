const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
  phoneNumber:{
    type: String,
    trim: true,
    maxlength: 32,
    text: true,
  },
  tenthPerc:{
    type: Number,
    trim: true,
    maxlength: 32,
  },
  tewlPerc:{
    type: Number,
    trim: true,
    maxlength: 32,
  },
  dob:{
    type: Date,
  },
  aadharNumber:{
    type: Number,
    trim: true,
    maxlength: 32,
  },
  gender:{
    type: String,
    enum: ["Male", "Female"],
  },
  tenthBoardName:{
    type: String,
    trim: true,
    text: true,
  },
  tenthSchoolName:{
    type: String,
    trim: true,
    text: true,
  },
  tewlBoardName:{
    type: String,
    trim: true,
    text: true,
  },
  tewlSchoolName:{
    type: String,
    trim: true,
    text: true,
  },
  country:{
    type: String,
    trim: true,
    text: true,
  },
  city:{
    type: String,
    trim: true,
    text: true,
  },
  state:{
    type: String,
    trim: true,
    text: true,
  },
  cityIso:{
    type: String,
    trim: true,
    text: true,
  },
  stateIso:{
    type: String,
    trim: true,
    text: true,
  },
  countryIso:{
    type: String,
    trim: true,
    text: true,
  },
  address:{
    type: String,
    trim: true,
    text: true,
  },
  tenthImage:{
    type: Array,
  },
  tewlImage:{
    type: Array,
  },
  aadharImage:{
    type: Array,
  },
  migrationCertImage:{
    type: Array,
  },
  college_id:{
    type: String,
  },
  wishlist: [{ type: ObjectId, ref: "College" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
