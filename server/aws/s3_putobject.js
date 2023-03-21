import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.

const BUCKET = "jaal-dsdss-documents"

const put = (file, fileName) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
    Body: file.buffer,
  });

  return s3Client.send(command).then((resp) => {
      //console.log(resp)
      return resp.$metadata.httpStatusCode
    }).catch()

};

export default {put};
