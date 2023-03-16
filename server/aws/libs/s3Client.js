import { S3Client } from '@aws-sdk/client-s3';

// Set the AWS Region.
const REGION = "eu-central-1";
const creds = {
    accessKeyId: "XXXXX",
    secretAccessKey: "XXXXXXXXXXXXs",
    sessionToken: "XXXXXX"
};

// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION , credentials: creds, });

export { s3Client };
