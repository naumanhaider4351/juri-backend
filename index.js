const express = require("express");
const morgan = require("morgan");
const port = 4000;
const mongoose = require("mongoose");
const { getAllHotels, createHotels, getHotelsById, deleteHotelsById, getSearchedCategory } = require("./controller/hotel.controller");
const { getAllHotelsDetails, createHotelDtails, updateHotelProducts, getHotelsThroughCategory } = require("./controller/hotel_details.controller");


mongoose
  .connect(
    "mongodb+srv://Muhammad-Usama:Juttisking123@cluster0.n4crq6n.mongodb.net/?retryWrites=true&w=majority",
    { maxPoolSize: 10 }
  )
  .then(() => {
    console.log("Database connected");
  });

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

// api route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/getAllCategory", getAllHotels);

app.get("/api/v1/getSearchedCategory", getSearchedCategory);

app.post("/api/v1/createCategory", createHotels);

app.get('/api/v1/getHotelsById/:id?', getHotelsById);

app.delete('/api/v1/deleteHotelsById/:id?', deleteHotelsById);

app.get("/api/v1/getAllHotelsDetails",getAllHotelsDetails)

app.post("/api/v1/createHotelDtails",createHotelDtails)

app.put("/api/v1/updateHotelProducts",updateHotelProducts)

app.get("/api/v1/getSearchedCatHotelDetails",getHotelsThroughCategory)



// app.get('/api/v1/getHotelsById/:id?', function(req, res) {
//     getHotelsById = req.params.id !== undefined ?
//     Hotel.filter(     function(obj)   {return obj.id== req.params.id} )
//         : Hotel ;
//     res.json(getHotelsById );
//  });

app.listen(port, () => {
  console.log(`The running port is ${port}`);
});
