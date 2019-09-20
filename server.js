const express = require("express");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const validator = require("validator");

// Server info

const server = express();
server.set('view engine', 'ejs');
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("public"));

// Chalk
const success_promt = chalk.bold.green.inverse;
const warning_promt = chalk.bold.yellow.inverse;
const error_promt = chalk.bold.red.inverse;
const inform_promt = chalk.bold.white.inverse;

// Taking request
server.get("/", function(req, res){
    res.render("converter", {
        initialTime: "0", 
        convertedHour: "0",
        convertedminute: "0",
        convertedSecond: "0",
    });
});

server.post("/", function(req, res){
    var initialTime = req.body.timeInSeconds;
    var validatorResult = validator.isNumeric(initialTime);
    if (validatorResult == true){
        var hours, minutes, seconds;
        const secondPerMimute = 60;
        const secondPerHour = 60 * 60;
        hours = parseInt(initialTime / secondPerHour);
        minutes = parseInt(parseInt(initialTime % secondPerHour) / secondPerMimute);
        seconds = initialTime - (parseInt(hours * secondPerHour) + parseInt(minutes * secondPerMimute));
        res.render("converter", {
            initialTime: initialTime, 
            convertedHour: hours,
            convertedminute: minutes,
            convertedSecond: seconds,
        });
        console.log(inform_promt("From the " + initialTime + " seconds that you want to convert..."));
        console.log(inform_promt("There are " + hours + " hours " + minutes + " minutes " + " and " + seconds + " seconds"));
    } else {
        console.log(error_promt("Invalid input from the user !!!"));
        console.log(warning_promt("Redirect them to the home page !!!"));
        res.render("400-error");
    }
});

server.post("/pagenotfound-404", function(req, res){
    res.redirect("/");
});

server.post("/badrequest-400", function(req, res){
    res.redirect("/");
});

server.get("*", function(req, res){
    res.render("404-error");
});

server.listen(process.env.PORT || 3000, function(req, res){
    console.log(success_promt("STARTING SERVER AT PORT 3000"));
    console.log(success_promt("READY TO TAKE NEW CONNECTION"));
});