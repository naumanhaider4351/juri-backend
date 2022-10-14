const mongoose = require("mongoose");

// const crypto = require("crypto");
// const { v4: uuidv4 } = require("uuid");

const hotelSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotels", hotelSchema);
