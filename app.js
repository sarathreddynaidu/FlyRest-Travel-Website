const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//connect
mongoose.connect("mongodb://localhost:27017/flyrestDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

//schema
const userSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    email: String,
    userName: String,
    cardNumber: Number,
    nameOnCard: String,
    expiryMonth: Number,
    expiryYear: Number,
    cvv: Number
});

const userCredSchema = new mongoose.Schema({
    userName: String,
    password: String,
});

userCredSchema.plugin(passportLocalMongoose);

const flightSchema = new mongoose.Schema({
    fromCity: String,
    toCity: String,
    departureDate: String,
    returnDate: String,
    travelers: Number,
    airline: String
});

const hotelSchema = new mongoose.Schema({
    city: String,
    checkIn: String,
    checkOut: String,
    rooms: Number,
    guests: Number,
    hotel: String
});

const flighthotelSchema = new mongoose.Schema({
    fromCity: String,
    toCity: String,
    departureDate: String,
    returnDate: String,
    travelers: Number,
    airline: String,
    city: String,
    checkIn: String,
    checkOut: String,
    rooms: Number,
    guests: Number,
    hotel: String
});

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    Message: String,
    rating: Number
});

//model
const User = mongoose.model("User", userSchema);

const Usercred = mongoose.model("UserCred", userCredSchema);

passport.use(Usercred.createStrategy());

passport.serializeUser(Usercred.serializeUser());
passport.deserializeUser(Usercred.deserializeUser());

const Flight = mongoose.model("Flight", flightSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);
const Flighthotel = mongoose.model("Flighthotel", flighthotelSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);

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

app.get("/index1", function(req, res){
    res.render("index1");
});

app.get("/flight1", function(req, res){
    res.render("flight1");
});

app.get("/flightConfirm", function(req, res){
    Flight.find({}, function(err, flightData){
        if(err){
            console.log(err);
        }
        else{
            User.find({}, function(err, userData){
                if(err){
                    console.log(err);
                }
                else{
                    res.render("flightConfirm", {
                        flights: flightData,
                        users: userData
                    });
                }
            });

        }
    });
    
});

app.get("/flightBooked", function(req, res){
    res.render("flightBooked");
});

app.get("/hotel1", function(req, res){
    res.render("hotel1");
});

app.get("/hotelConfirm", function(req, res){
    Hotel.find({}, function(err, hotelData){
        if(err){
            console.log(err);
        }
        else{
            User.find({}, function(err, userData){
                if(err){
                    console.log(err);
                }
                else{
                    res.render("hotelConfirm", {
                        hotels: hotelData,
                        users: userData
                    });
                }
            });

        }
    });
});

app.get("/hotelBooked", function(req, res){
    res.render("hotelBooked");
});

app.get("/flightHotel1", function(req, res){
    res.render("flightHotel1");
});

app.get("/flightHotelConfirm", function(req, res){
    Flighthotel.find({}, function(err, flightHotelData){
        if(err){
            console.log(err);
        }
        else{
            User.find({}, function(err, userData){
                if(err){
                    console.log(err);
                }
                else{
                    res.render("flightHotelConfirm", {
                        flightHotels: flightHotelData,
                        users: userData
                    });
                }
            });

        }
    });
});

app.get("/flightHotelBooked", function(req, res){
    res.render("flightHotelBooked");
});

app.get("/deals1", function(req, res){
    res.render("deals1");
});

app.get("/flightStatus1", function(req, res){
    res.render("flightStatus1");
});

app.get("/mileage1", function(req, res){
    res.render("mileage1");
});

app.get("/feedback1", function(req, res){
    res.render("feedback1");
});

app.get("/feedbackDone", function(req, res){
    res.render("feedbackDone");
});

app.get("/orders1", function(req, res){
    res.render("orders1");
});

app.get("/signup", function(req, res){
    res.render("signup");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/index1", function(req, res){
    if(req.isAuthenticated()){
        res.render("index1");
    }
    else{
        res.redirect("/login");
    }
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

app.post("/flight1", function(req, res){
    const newFlight = new Flight({
        fromCity: req.body.fromcity,
        toCity: req.body.tocity,
        departureDate: req.body.departurecity,
        returnDate: req.body.returncity,
        travelers: req.body.travelers,
        airline: req.body.airline
    });
    newFlight.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Flight data added");
        }
        res.redirect("/flightConfirm");
    });
});

app.post("/flightConfirm", function(req, res){
    res.redirect("/flightBooked");
});

app.post("/hotel1", function(req, res){
    const newHotel = new Hotel({
        city: req.body.city,
        checkIn: req.body.checkin,
        checkOut: req.body.checkout,
        rooms: req.body.rooms,
        guests: req.body.guests,
        hotel: req.body.hotel
    });
    newHotel.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Hotel data added");
        }
        res.redirect("/hotelConfirm");
    });
    
});

app.post("/hotelConfirm", function(req, res){
    res.redirect("/hotelBooked");
});

app.post("/flighthotel1", function(req, res){
    const newFlightHotel = new Flighthotel({
        fromCity: req.body.fromcity,
        toCity: req.body.tocity,
        departureDate: req.body.departuredate,
        returnDate: req.body.returndate,
        travelers: req.body.travelers,
        airline: req.body.airline,
        city: req.body.city,
        checkIn: req.body.checkin,
        checkOut: req.body.checkout,
        rooms: req.body.rooms,
        guests: req.body.guests,
        hotel: req.body.hotel
    });
    newFlightHotel.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Flight + Hotel data added");
        }
        res.redirect("/flightHotelConfirm");
    });
});

app.post("/flightHotelConfirm", function(req, res){
    res.redirect("/flightHotelBooked");
});

app.post("/feedback1", function(req, res){
    const userFeedback = new Feedback({
        name: req.body.name,
        email: req.body.email,
        Message: req.body.message,
        rating: req.body.rating
    });
    userFeedback.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("User feedback added");
        }
        res.redirect("/feedbackDone");
    });
});

app.post("/signup", function(req, res){
    const newUser = new User({
        firstName: req.body.firstname,
        middleName: req.body.middlename,
        lastName: req.body.lastname,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zipCode: req.body.zipcode,
        email: req.body.email,
        userName: req.body.username,
        cardNumber: req.body.cardnumber,
        nameOnCard: req.body.nameoncard,
        expiryMonth: req.body.expirymonth,
        expiryYear: req.body.expiryyear,
        cvv: req.body.cvv
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Data added");
        }
    });
    Usercred.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/signup");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/index1");
            });
        }
    });
});

app.post("/login", function(req, res){
    const usercred = new Usercred({
        username: req.body.username,
        password: req.body.password
    });
    req.login(usercred, function(err){
        if(err){
            console.log(err);
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/index1");
            });
        }
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
});