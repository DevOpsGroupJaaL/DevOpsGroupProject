import express from 'express';
var router = express.Router();
import s3Buckets from '../utils/s3_listbuckets.js';


/* GET users listing. */
router.get('/', function(req, res, next) {
  s3Buckets.run().then(s3Data => {
    console.log(s3Data);
    res.send(s3Data[0].Name);
  })
});

export default router;
