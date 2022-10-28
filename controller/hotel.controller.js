// const { body } = require('express-validator');
const Hotel = require("../modal/hotels.modal");
// const hotelId = require("../modal/searchById")
// const jwt = require('jsonwebtoken');
const { application, json } = require("express");
const { deleteOne } = require("../modal/hotels.modal");

exports.getAllHotels = async (req, res) => {
  Hotel.find(function (err, item) {
    console.log(Hotel);
    return res.status(200).json({ hotels: item, success: true });
  });
};

exports.getSearchedCategory = async (req, res) => {
  if (req.query.cat)
  Hotel.find({ CategoryName: { $in: req.query.cat } }, function (err, item) {
    console.log(Hotel);
    return res.status(200).json({ hotels: item, success: true });
  });
  else{
  return res.status(500).json({ error:'Check the param', success: false });
  }
};

exports.createHotels = async (req, res) => {
  const { CategoryName, imgUrl } = req.body;

  if (CategoryName === "" || CategoryName === undefined) {
    return res
      .status(422)
      .json({ success: false, message: "Category Name is required" });
  } else {
    const hotel = new Hotel(req.body);
    try {
      const createdHotel = await hotel.save();
      return res.status(201).json({ user: createdHotel });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
};

exports.getHotelsById = async (req, res) => {
  let data = null;
  let _id = req.params.id;

  try {
    data = await Hotel.findOne({ _id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  console.log("Details", data);
  return res.status(200).json({
    success: true,
    data,
  });
};

exports.deleteHotelsById = async (req, res) => {
  // let data = await Hotel.findOne({ _id });
  let _id = req.params.id;

  try {
    const deleteData = await Hotel.deleteOne({ _id })
    console.log(deleteData)
    if(deleteData.deletedCount === 1){
      return res.status(200).json({ success:true,message:'Deleted Successfully' });
    }
    return res.status(400).json({ success:false,message:'Unable to delete record' });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};
