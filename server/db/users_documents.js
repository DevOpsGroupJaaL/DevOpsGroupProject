import dotenv from 'dotenv'
dotenv.config(); //module loading environment variables from .env file

import pool from '../db/index.js';

// returning all records from userlist
const getUsers = (request, response) => { //assigning anonymous function to constant
  pool.query('SELECT * FROM users')
  .then(results => {
    // handle the results
    const res = results[0]
    console.log("test");
    console.log(results[0]);
    response.set('Content-Type', 'application/json');
    response.status(200).json({ res });
  })
  .catch(error => {
    // handle the error
    console.error(error);
  });
}

//   pool.query('SELECT * FROM users', (err, results))=> {
//   if (err) {
//     var message = `Error! Cannot get users.`;
//     response.status(400);
//     response.json({ message });
//     console.log(err);
//   }
//   console.log("tes suc");
//   var success = '1';
//   output = results.rows;
//   response.set('Content-Type', 'application/json');
//   response.status(200).json({ success,output });
// }


export default { getUsers  };
