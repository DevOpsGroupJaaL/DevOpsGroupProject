import express from 'express';
import apiRouter from './routes/index.js';

// const cors = require("cors");

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathVal = __dirname + '/views/';

const app = express();

app.use(cors());


// var corsOptions = {
//   origin: "http://localhost:8080"
// };

// app.use(cors(corsOptions));

// Pick up React index.html file

app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

app.use(
  express.static(path.join(__dirname, "../build"))
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter); // Using router via /api path

// simple route
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../build/index.html")
  );
});

// app.get("/api", (req, res) => {
//   console.log("test req");
//   res.json({ message: "Hello from server!" });
// });



// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
