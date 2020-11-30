const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connect
mongoose.connect("mongodb://localhost:27017/flyrestDB", {useNewUrlParser: true, useUnifiedTopology: true});

//schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    email: String,
    userName: String,
    password: String
});

const flightSchema = new mongoose.Schema({
    from: String,
    to: String,
    departure: Date,
    return: Date,
    travelers: Number
});

const hotelSchema = new mongoose.Schema({
    city: String,
    to: String,
    departure: Date,
    return: Date,
    rooms: Number,
    guests: Number
});

//model
const User = mongoose.model("User", userSchema);
const Flight = mongoose.model("Flight", flightSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);

//create

// const newUser = new Fly({
//     firstName: "Sarath",
//     lastName: "Reddy",
//     userName: "ssmb1045",
//     email: "scrn@gmail.com",
//     password: "donno"
// });

// newUser.save(function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("User added to database");
//     }
// });

app.get("/", function(req, res){
    res.render("index");
});

app.get("/flight", function(req, res){
    res.render("flight");
});

app.get("/hotel", function(req, res){
    res.render("hotel");
});

app.get("/flightHotel", function(req, res){
    res.render("flightHotel");
});

app.get("/deals", function(req, res){
    res.render("deals");
});

app.get("/flightStatus", function(req, res){
    res.render("flightStatus");
});

app.get("/mileage", function(req, res){
    res.render("mileage");
});

app.get("/feedback", function(req, res){
    res.render("feedback");
});

app.get("/signup", function(req, res){
    res.render("signup");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
});