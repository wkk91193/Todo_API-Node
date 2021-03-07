const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path =require('path');
require('dotenv').config({path: path.resolve(__dirname+'/.env')});
const app = express();

var corsOptions = {
  origin: process.env.CORS_URL
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ToDo application." });
});

require('./routes/task.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


app.use(function(err, req, res, next) {
  // This is error handler
  console.log(JSON.stringify(err));
});

module.exports = app;