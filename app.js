const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function(req, res){
    const query = req.body.cityName;
    const apiId = "";  //adding the API key
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiId + "&q="+ query + "&units=" + unit;
    
    https.get(url, function(response){
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const weather = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.setHeader("Content-Type", "text/html");
            
            res.write("<h3> The weather in " + query + " is : " + weather + "</h3>");
            res.write("<img src= "+ imageUrl + " >");
            res.write("<h1> The temperature in " + query + " is : " + temp + " degree celcius </h1>");
            res.send();
            console.log("Post request received");
})

app.listen(3000, function(){
    console.log("Server running at 3000 port")
})

