// Import required AWS SDK clients and commands for Node.js.
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.


const run = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    return data.Buckets; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

export default {run}
