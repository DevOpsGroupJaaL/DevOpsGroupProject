import dotenv from 'dotenv' //module loading environment variables from .env file
import bodyParser from 'body-parser';
import express from 'express';

import mysql from 'mysql2/promise';
dotenv.config();
const app = express();

app.use(bodyParser.json())

console.log(process.env.DB_HOST);

// create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
});

// // execute a query
// pool.query('SELECT * FROM users')
//   .then(results => {
//     // handle the results
//     console.log(results);
//   })
//   .catch(error => {
//     // handle the error
//     console.error(error);
//   });


export default pool;


