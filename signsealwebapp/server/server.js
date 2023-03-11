const express = require("express");
// const cors = require("cors");

const path = __dirname + '/views/';

const app = express();

app.use(express.static(path));


// var corsOptions = {
//   origin: "http://localhost:8080"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.sendFile(path + "index.html");
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});