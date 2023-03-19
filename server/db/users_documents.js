import dotenv from 'dotenv'
dotenv.config(); //module loading environment variables from .env file

import pool from '../db/index.js';

// returning all records from userlist
const getUsers = (request, response) => { //assigning anonymous function to constant
  pool.query('SELECT * FROM users')
  .then(results => {
    // handle the results
    const res = results[0]
    response.set('Content-Type', 'application/json');
    response.status(200).json({ res });
  })
  .catch(error => {
    // handle the error
    var message = `Error!`;
    console.error(error);
    response.status(400);
    response.json({ message });
  });
}

const getUserAccessibleDocuments = (request, response) => { //assigning anonymous function to constant
  const userid = request.params.userid;
  pool.query('SELECT udr.user_id, d.* FROM user_document_rights AS udr INNER JOIN documents AS d ON (udr.document_id = d.document_id) WHERE udr.user_id = ?', [userid])
  .then(results => {
    // handle the results
    const res = results[0]
    response.set('Content-Type', 'application/json');
    response.status(200).json({ res });
  })
  .catch(error => {
    // handle the error
    var message = `Error!`;
    console.error(error);
    response.status(400);
    response.json({ message });
  });
}

const getUserAccessibleDocumentsForOPA = (request, response) => { //assigning anonymous function to constant
  pool.query('SELECT d.document_id, udr.user_id FROM user_document_rights AS udr INNER JOIN documents AS d ON (udr.document_id = d.document_id) ORDER BY d.document_id')
  .then(results => {
    // handle the results
    const res = results[0]
    response.set('Content-Type', 'application/json');
    response.status(200).json({ res });
  })
  .catch(error => {
    // handle the error
    var message = `Error!`;
    console.error(error);
    response.status(400);
    response.json({ message });
  });
}

const getUserOwnedDocuments = (request, response) => { //assigning anonymous function to constant
  const userid = request.params.userid;

  pool.query('SELECT * FROM documents WHERE (owner_user_id = ?)', [userid])
  .then(results => {
    // handle the results
    const res = results[0]
    response.set('Content-Type', 'application/json');
    response.status(200).json({ res });
  })
  .catch(error => {
    // handle the error
    var message = `Error!`;
    console.error(error);
    response.status(400);
    response.json({ message });
  });
}

const postUsers = (request, response) => { //assigning anonymous function to constant
  const obj = request.body;  // variable obj is initialised as the JSON body of the POST request

  pool.query('INSERT INTO users (user_email) VALUES (?)', [obj.email])
  .then(results => {
    // handle the results
    const res = results[0]
    response.set('Content-Type', 'application/json');
    response.status(200).json({ res });
  })
  .catch(error => {
    // handle the error
    var message = `Error!`;
    console.error(error);
    response.status(400);
    response.json({ message });
  });
}

const postDocuments = (request, response) => { //assigning anonymous function to constant
  const obj = request.body;  // variable obj is initialised as the JSON body of the POST request

  pool.query('INSERT INTO documents (document_path, document_name, document_status, owner_user_id) VALUES (?, ?, ?, ?)',
  [obj.document_path, obj.document_name, obj.document_status, obj.owner_user_id])
  .then(results => {
    // handle the results
    const res = results[0]
    response.set('Content-Type', 'application/json');
    response.status(200).json({ res });
  })
  .catch(error => {
    // handle the error
    var message = `Error!`;
    console.error(error);
    response.status(400);
    response.json({ message });
  });
}

const postUserRightsAdd = (request, response) => { //assigning anonymous function to constant
  const obj = request.body;  // variable obj is initialised as the JSON body of the POST request

  pool.query('INSERT INTO user_document_rights (user_id, document_id) VALUES (?, ?)', [obj.user_id, obj.document_id])
  .then(results => {
    // handle the results
    const res = results[0]
    response.set('Content-Type', 'application/json');
    response.status(200).json({ res });
  })
  .catch(error => {
    // handle the error
    var message = `Error!`;
    console.error(error);
    response.status(400);
    response.json({ message });
  });
}

const postUserRightsDelete = (request, response) => { //assigning anonymous function to constant
  const obj = request.body;  // variable obj is initialised as the JSON body of the POST request

  pool.query('DELETE FROM user_document_rights WHERE (user_id = ?) & (document_id = ?)', [obj.user_id, obj.document_id])
  .then(results => {
    // handle the results
    const res = results[0]
    response.set('Content-Type', 'application/json');
    response.status(200).json({ res });
  })
  .catch(error => {
    // handle the error
    var message = `Error!`;
    console.error(error);
    response.status(400);
    response.json({ message });
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


export default {
  getUsers,
  postUsers,
  postUserRightsAdd,
  postUserRightsDelete,
  postDocuments,
  getUserOwnedDocuments,
  getUserAccessibleDocuments,
  getUserAccessibleDocumentsForOPA
};
