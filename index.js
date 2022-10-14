const express = require("express");
const morgan = require("morgan");
const port = 3000;
const mongoose = require("mongoose");
const { getAllHotels, createHotels, getHotelsById, deleteHotelsById } = require("./controller/hotel.controller");


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

app.get("/api/v1/getAllHotels", getAllHotels);

app.post("/api/v1/createHotel", createHotels);

app.get('/api/v1/getHotelsById/:id?', getHotelsById);

app.delete('/api/v1/deleteHotelsById/:id?', deleteHotelsById);

// app.get('/api/v1/getHotelsById/:id?', function(req, res) {
//     getHotelsById = req.params.id !== undefined ?
//     Hotel.filter(     function(obj)   {return obj.id== req.params.id} )
//         : Hotel ;
//     res.json(getHotelsById );
//  });

app.listen(port, () => {
  console.log(`The running port is ${port}`);
});
