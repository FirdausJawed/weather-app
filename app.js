const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
const https = require("https");


app.get("/", function(req, res) {
 res.sendFile(__dirname + "/index.html");
});

   app.post("/", function(req, res){

     const query = req.body.cityname;
     const apikey= "a64ec705958a0cbcd8d27fcd8860d9a2";
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apikey
     https.get(url, function(response) {
       console.log(response.statusCode);

       response.on("data", function(data) {
       const json = JSON.parse(data)
       const tempreture = json.main.temp;
       const des = json.weather[0].description;
       const icon = json.weather[0].icon;
       const imageUrl = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";

       res.write("<h1>The temperature currently in " +query+ " is " + tempreture + " degree celcius.</h1>");
       res.write("<h1>The weather status is currently " + des + "</h1>");
       res.write("<img src=" + imageUrl+ ">");
       res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("checking the weather");
});
