import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { s3Client } from "../libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.

const put = async () => {
  const command = new PutObjectCommand({
    Bucket: "jaal-dsdss-documents",
    Key: "test.txt",
    Body: "Hello World!",
    //j w
  });

  try {
    const response = await s3Client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export default { put };
