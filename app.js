const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function(req, res){
    console.log("post request successful");
    res.redirect('/');
})

app.listen(3000, function(){
    console.log("Server running at 3000 port")
})

