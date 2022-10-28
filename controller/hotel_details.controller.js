// const { body } = require('express-validator');
const HotelDetails = require("../modal/hotels_details.modal");
const Hotel = require("../modal/hotels.modal");
// const hotelId = require("../modal/searchById")
// const jwt = require('jsonwebtoken');
const { application, json } = require("express");
const { deleteOne } = require("../modal/hotels.modal");

exports.getAllHotelsDetails = async (req, res) => {
  HotelDetails.find(function (err, item) {
    console.log(item);
    return res.status(200).json({ hotels: item, success: true });
  });
};

exports.getHotelsThroughCategory = async (req, res) => {
  if (req.query.cat)
  HotelDetails.find({ category: { $in: req.query.cat } }, function (err, item) {
    console.log(HotelDetails);
    return res.status(200).json({ hotels: item, success: true });
  });
  else{
  return res.status(500).json({ error:'Check the param', success: false });
  }

  // HotelDetails.find(function (err, item) {
  //   console.log(item);
  //   return res.status(200).json({ hotels: item, success: true });
  // });
};

exports.createHotelDtails = async (req, res) => {
  const { category_id, category } = req.body;
  console.log(category_id);
  if (category_id === "" || category_id === undefined) {
    return res
      .status(500)
      .json({ success: false, message: "category_id is required" });
  } else {
    let existingCat = null;

    try {
      existingCat = await Hotel.findOne({ _id: category_id });
    } catch (err) {
      return res.status(500).json({ error: err.message, success: false });
    }

    if (
      category === existingCat.CategoryName ||
      category_id === existingCat._id
    ) {
      console.log(req.body.products);
      const hotel = new HotelDetails({
        category_id: req.body.category_id,
        hotelDetail: req.body.hotelDetail,
        hotelName: req.body.hotelName,
        category: req.body.category,
        products: req.body.products,
        description:req.body.description
      });

      try {
        const createdHotelDetails = await hotel.save();
        return res
          .status(201)
          .json({ hotel_details: createdHotelDetails, success: true });
      } catch (err) {
        return res.status(400).json({ error: err.message, success: false });
      }
    } else {
      return res
        .status(500)
        .json({ error: "Something went wrong", success: false });
    }
  }
};

exports.updateHotelProducts = async (req, res) => {
  const { products, hotel_id } = req.body;
  if (hotel_id === "" || hotel_id === undefined) {
    return res
      .status(500)
      .json({ error: "Hotel ID is required", success: false });
  } else if (products === "" || products === undefined) {
    return res
      .status(500)
      .json({ error: "Products are required", success: false });
  }
  try {
    let existingHotel = await HotelDetails.findOne({ _id: hotel_id });
    if (existingHotel) {
      let data = HotelDetails.findOneAndUpdate(
        { _id: hotel_id },
        { $set: { products: products } },
        { new: true },
        (error, doc) => {
          if (error)
            return res.status(500).json({ err: error, success: false });
          return res.status(200).json({ data: doc, success: true });
        }
      );
      return res.status(200).json({ data: data, success: true });
    } else {
      return res
        .status(500)
        .json({ error: "Invalid Hotel ID", success: false });
    }
  } catch (error) { }
};
