import { S3Client } from '@aws-sdk/client-s3';
import { CREDS } from './devAWSCreds.js'

// Set the AWS Region.
const REGION = "eu-central-1";

// Create an Amazon S3 service client object.
const s3Client = () => {
    if(process.env.IS_PROD == "true") {
        return new S3Client({ region: REGION});
    } else {
        return new S3Client({ region: REGION , credentials: CREDS});

    }
}
export { s3Client };
