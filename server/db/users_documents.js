import dotenv from 'dotenv'
import pool from '../db/index.js';
dotenv.config(); //module loading environment variables from .env file


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

const getUserIdByEmail = (request, response) => {
  const email = request.params.email; // assuming the email is passed as a URL parameter
  pool.query('SELECT user_id FROM users WHERE user_email = ?', [email])
    .then(results => {
      const userId = results[0][0];
      response.set('Content-Type', 'application/json');
      response.status(200).json( userId );
    })
    .catch(error => {
      var message = error.message;
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

const getUserOwnedDocuments = (request, response) => { //assigning anonymous function to constant
  const userid = request.params.userid;

  pool.query('SELECT d.*, u.user_email FROM documents AS d INNER JOIN user_document_rights AS udr ON d.document_id = udr.document_id INNER JOIN users AS u on udr.user_id = u.user_id WHERE (d.owner_user_id = ?)', [userid])
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


export default { getUsers, postUsers,getUserIdByEmail, postUserRightsAdd, postUserRightsDelete, postDocuments, getUserOwnedDocuments, getUserAccessibleDocuments};
