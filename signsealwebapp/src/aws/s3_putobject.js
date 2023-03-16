import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.


const put = async ( file ) => {
  console.log("STONKS IN PUT")
  console.log(file);
  const command = new PutObjectCommand({
    Bucket: "jaal-dsdss-documents",
    Key: file.name,
    Body: file,
    //j w
  });

  try {
    const response = await s3Client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export default {put};
