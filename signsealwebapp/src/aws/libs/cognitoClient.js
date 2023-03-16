import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

// Set the AWS Region.
const REGION = "eu-central-1";
// Create an Amazon S3 service client object.
const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });


export { cognitoClient };
