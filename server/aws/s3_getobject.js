// gets an object from S3 bucket
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property


import {  GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module

const get = async (Key) => {

    try {
        const response =  await s3Client().send(new GetObjectCommand({
            Bucket: "jaal-dsdss-documents",
            Key: Key}
        ));
        // console.log("response: ", response.Body);
        return response;
        // return response.Body;
    } catch (err) {
        console.error(err);
    }
    };

export default {get}
