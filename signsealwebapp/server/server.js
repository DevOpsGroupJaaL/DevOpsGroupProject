import express from 'express';
import apiRouter from './routes/index.js';

// const cors = require("cors");

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = __dirname + '/views/';

const app = express();

app.use(cors());
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

// app.get("/api", (req, res) => {
//   console.log("test req");
//   res.json({ message: "Hello from server!" });
// });

app.use('/api', apiRouter); // Using router via /api path


// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
