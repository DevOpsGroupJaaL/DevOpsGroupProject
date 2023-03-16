// Creating routing to determine how app responds to a client request - part of MIDDLEWARE

import express from 'express';

import dbUsers from '../db/users_documents.js';

const router = express.Router();

// Standard get request of url myvault.technology/api/
router.get('/', (request, response) => {
  response.json({ info: 'API  for MyVault App.' });
});

router;
// Types of requests,routed thorugh the db folder

//userlist requests
router.get('/users', dbUsers.getUsers);
// router.get('/users/details', auth, dbUsers.getUserDetails);
// router.post('/users', dbUsers.createUsers);
// router.post('/login', dbUsers.performLogin);
// router.put('/users/update', auth, dbUsers.updateUsers);
// router.delete('/users', auth, dbUsers.deleteUsers);

export default router;
