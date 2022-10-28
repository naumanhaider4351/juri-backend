const mongoose = require("mongoose");

// const crypto = require("crypto");
// const { v4: uuidv4 } = require("uuid");

const hotelDetails = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      trim: true,
      required: true,
    },
    imgUrl: {
      type: String,
      trim: true,
    },
    hotelDetail: {
      type: String,
      trim: true,
      required: true,
    },
    category_id:{
      type: String,
      trim: true,
      required: true,
    },
    category:{
      type: String,
      trim: true,
      required: true,
    },
    description:{
      type: String,
      trim: true,
      required: true,
    },
    products:[
      {product_id: String,product_name:String,product_img:String}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("HotelsDetails", hotelDetails);
