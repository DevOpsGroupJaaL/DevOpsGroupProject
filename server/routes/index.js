// Creating routing to determine how app responds to a client request - part of MIDDLEWARE

import express from 'express';

import dbUsers from '../db/users_documents.js';
import getS3Object from "../aws/s3_getobject.js"
import putS3Object from "../aws/s3_putobject.js"
import listUsers from "../aws/cognito_listusers.js"
import { logout } from "../aws/cognito_logOut.js"
import { GetCurrentUser } from "../aws/cognito_currentUser.js"
import multer from 'multer';
import { createCertificate } from '../dss/create_cert.js';
import { signDocument } from '../dss/sign_doc.js';

import opaRequests from '../db/opa_requests.js';

const router = express.Router();

// Standard get request of url myvault.technology/api/
router.get('/', (request, response) => {
  response.json({ info: 'API  for MyVault App.' });
});


// Types of requests,routed thorugh the db folder

// //userlist requests
// router.post('/s3/getObject',  function (req, res, next) {
//   let pdf = getS3Object.get(req.body.filename)
//     .then(() => {
//         if(pdf) {
//           console.log("FILE!!!")
//           res.contentType("application/pdf");
//           res.status(200);
//           res.send(pdf);
//         }
//       }
//   )
// });


router.post('/s3/getObject', function (req, res, next) {
  getS3Object.get(req.body.filename)
  .then((awsFile) => {
    // if (awsFile) {
      console.log("FILE!!!");
      // res.contentType("text/plain");
      // res.contentType("application/pdf");
      // console.log(awsFile)
      // res.setHeader('Content-Type', 'application/pdf');
      // res.status(200);
      // res.send(awsFile);
    console.log(awsFile)
    res.setHeader('Content-Type', 'application/pdf');
    res.send(awsFile);
    console.log(res)

      // res.send(Buffer.from(awsFile)); // send the file data
    // } else {
    //   console.log("File not found");
    //   res.status(404).send("File not found"); // return a 404 error if file not found
    // }
  }).catch((error) => {
    console.log("Error:", error);
    res.status(500).send("Error"); // return a 500 error if there is an error
    res.end(); // end the response
  });
});



router.post('/s3/putObject',multer().any() ,  function (req, res, next)
 {
  console.log(req)
     putS3Object.put(req.files[0], req.body.fileName).then((replyStatus) => {
      console.log(replyStatus);
      if(replyStatus == 200) {
        res.status(200);
        res.json({body: "uploadOK"});
      }
      res.end();
    })
  });
router.get('/cognito/listUsers', listUsers);
router.post('/cognito/logOut', function (req, res) {
  logout(req.body.accessToken).then(() => {
    res.status(200);
    res.json(JSON.stringify({status: "ok"}));
    res.end();
  })
});
router.post('/cognito/currentUser', function (req, res) {
  GetCurrentUser(req.body.accessToken).then((userDetails) => {
    res.status(200);
    res.json(JSON.stringify(userDetails));
    res.end();
  })
});
router.post('/dss/sign', function (req, res) {
  const payload = req.body
  signDocument(payload.document_dir, payload.username, payload.name, payload.certificate_pass).then(status => {
    res.status(status);
    res.json({status: status});
    res.end();
  })
})

router.post('/dss/certificate', function (req, res) {
  const payload = req.body
  console.log(payload)
  createCertificate(payload.username, payload.full_name, payload.password)
  .then(status => {
    res.status(status);
    res.json({status: status});
    res.end();
  });
})
router.get('/users', dbUsers.getUsers);
router.post('/users', dbUsers.postUsers);
router.get('/users/:email', dbUsers.getUserIdByEmail);
router.post('/userRightsDelete', dbUsers.postUserRightsDelete);
router.post('/userRightsAdd', dbUsers.postUserRightsAdd);
router.post('/userRightsWipe', dbUsers.postUserRightsWipe);
router.post('/userRightsAddMany', dbUsers.postUserRightsAddMany);
router.post('/documents', dbUsers.postDocuments);
router.get('/userOwnedDocuments/:userid', dbUsers.getUserOwnedDocuments);
router.get('/userAccessibleDocuments/:userid', dbUsers.getUserAccessibleDocuments);
router.get('/userAccessibleDocumentsForOPA', dbUsers.getUserAccessibleDocumentsForOPA);
router.post('/updateOpaPolicy', opaRequests.UploadOpaDataBackend);
router.post('/retrieveOpaAccess', opaRequests.RetrieveOpaDataBackend);

export default router;
