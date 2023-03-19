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
router.post('/users', dbUsers.postUsers);
router.post('/userRightsDelete', dbUsers.postUserRightsDelete);
router.post('/userRightsAdd', dbUsers.postUserRightsAdd);
router.post('/documents', dbUsers.postDocuments);
router.get('/userOwnedDocuments/:userid', dbUsers.getUserOwnedDocuments);
router.get('/userAccessibleDocuments/:userid', dbUsers.getUserAccessibleDocuments);



router.get('/userAccessibleDocumentsForOPA', dbUsers.getUserAccessibleDocumentsForOPA);

export default router;
