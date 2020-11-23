const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index");
});

app.get("/flight", function(req, res){
    res.render("flight");
});

app.get("/hotel", function(req, res){
    res.render("hotel");
});

app.get("/blog", function(req, res){
    res.render("blog");
});

app.get("/contact", function(req, res){
    res.render("contact");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
});