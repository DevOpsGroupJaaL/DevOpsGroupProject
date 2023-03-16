// Creating routing to determine how app responds to a client request - part of MIDDLEWARE

import express from 'express';

import dbUsers from '../db/users_documents.js';
import getS3Object from "../aws/s3_getobject.js"
import putS3Object from "../aws/s3_putobject.js"
import listUsers from "../aws/cognito_listusers.js"
import logOut from "../aws/cognito_logout.js"
import currentUser from "../aws/cognito_currentUser.js"

const router = express.Router();

// Standard get request of url myvault.technology/api/
router.get('/', (request, response) => {
  response.json({ info: 'API  for MyVault App.' });
});


// Types of requests,routed thorugh the db folder

//userlist requests
router.get('/users', dbUsers.getUsers);
router.get('/s3/getObject/:name', getS3Object.get);
router.post('/s3/putObject',  function (req, res, next) {
    console.log(req)
    console.log("=====================================================")
    console.log(res)

    // putS3Object(req, res, next)
    console.log("POST request called");
    res.end();
  });;
router.get('/cognito/listUsers', listUsers);
router.put('/cognito/logOut', logOut);
router.get('/cognito/currentUser', currentUser);
// router.get('/users/details', auth, dbUsers.getUserDetails);
// router.post('/users', dbUsers.createUsers);
// router.post('/login', dbUsers.performLogin);
// router.put('/users/update', auth, dbUsers.updateUsers);
// router.delete('/users', auth, dbUsers.deleteUsers);

export default router;
