// ┌──────────────────────┐
// │   Global Variables   │	
// └──────────────────────┘

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Use body parser to get input from user
app.use(bodyParser.urlencoded({extended: true}));

// ┌─────────────────────┐
// │   Server Functions  │	
// └─────────────────────┘

// SERVER: Go to this file at start
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

// SERVER: Do this when post called
app.post("/", function(req, res){

    // Get input from user
    const query = req.body.cityName;

    // Create URL
    const unit = "imperial"
    const key = "API KEY HERE DON'T PUT ON GITHUB"
    const url = "https://api.openweathermap.org/data/2.5/weather?units=" + unit + "&q=" + query + "&appid=" + key;

    // Fetch from external server, URL points to server
    https.get(url, function(response){
        console.log(response.statusCode)

        // Let's do this with the data that is returned
        response.on("data", function(data){

            // Convert data from HEX to JSON
            const weatherData = JSON.parse(data)

            // Collect data of interest
            const temp = weatherData.main.temp;
            const feelsLike = weatherData.main.feels_like;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIconCode = weatherData.weather[0].icon;

            // Write to HTML document with the data collected
            res.write("<h1>The temperature in New York is " + temp + " degrees Fahrenheit</h1>")
            res.write("<h2>The weather is currently " + weatherDescription + "<h2><br>")
            res.write("<img src=http://openweathermap.org/img/wn/" + weatherIconCode.toString() + "@4x.png>")

            // Server, please send what's written to browser
            res.send()
        })
    })
})

// SERVER: Listen on this port
app.listen(port, function(req, res){
    console.log("Server started on port " + port);
})
