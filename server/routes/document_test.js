import express from 'express';
var router = express.Router();
import s3Buckets from '../utils/s3_listbuckets.js';
import listObjects from '../utils/s3_listObjects.js';
import getObject from '../utils/s3_getobject.js';
import putObject from '../utils/s3_putobject.js';
// import cognitoUsers from '../utils/cognito_listusers.js';


// GET list of associated/owned documents for current user from RDS
// single file > query opa for permmission > return file from S3

/* GET buckets listing. */
router.get('/', function(req, res, next) {
  s3Buckets.run().then(s3Data => {
    console.log(s3Data);
    // res.send(s3Data[0].Name); // For unit tests.
  })
});

/* GET all objects. */
router.get('/objects', function(req, res, next) {
  listObjects.get().then(s3Data => {
    console.log(s3Data);
  })
});

/* GET object */
router.get('/objects/:key', function(req, res, next) {
  getObject.get(req.params.key).then(s3Data => {
    console.log(s3Data);
  })
});

/* PUT object */
router.put('/objects/:key', function(req, res, next) {
  putObject.put(req.params.key).then(s3Data => {
    console.log(s3Data);
  })
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  cognitoUsers.listUsers({userPoolId: "eu-central-1_4ZQ2Z2Z2Z"}).then(cognitoUsers => {
    console.log(cognitoUsers);
  })
});



export default router;


