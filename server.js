//jshint esversion:6
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const Counter = require("./models/counter");

mongoose.connect("mongodb://localhost:27017/CloudCountersDB",//"mongodb+srv://adminzineddine:adminpassword@cluster0.etraw.mongodb.net/myFirstDatabase",
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false, 
        useCreateIndex: true
    }
);

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialize: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

if(process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


////////////////////////  Login/Register Routes  ////////////////////////

app.post("/isAuthenticated", function(req, res){
    if(req.isAuthenticated()) return res.send({isAuthenticated: true, user: req.user});
    return res.send({isAuthenticated: false});
});

app.post("/login", function(req, res, next) {
    passport.authenticate("local", function(error, user, info) {
        if (error) return next(error); 
        if (!user) return res.send(error);
        req.logIn(user, function(error) {
            if (error) return next(error);
            return res.send("sucess");
        });
    })(req, res, next);
});

app.post("/register", function(req, res){
    User.register(
        new User({username: req.body.username, name:req.body.name}), 
        req.body.password, function(error, user){
            if(error){
                console.log(error);
                return res.send(error);
            }
            passport.authenticate("local")(req, res, function(){
                return res.send("sucess");
            });
        }
    );
});

app.post("/logout", function(req, res){ 
    req.logout();
    return res.send("Logged out");
});





const port = process.env.PORT || 8080;
app.listen(port);
console.log("Server running on port " + port);