// server.js
// where your node app starts

// init project
require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const path = require("path");
const app = express();

// Serve static files from react build folder
app.use(express.static(path.join(__dirname, "client/build")));

// API route to list rows from Airtable:

const connection = require("./database");

app.get("/api/:table/list/:page", function(request, response) {
  console.log("Handling API request");
  connection.handleListRequest(request, response);
});

app.get("/api*", function(request, response) {
  const responseObject = {
    Error: "Invalid path"
  };

  response.status(400).end(JSON.stringify(responseObject));
});

// serve any other routes my build index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

// listen for requests :)
var listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
