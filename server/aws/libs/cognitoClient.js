import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { CREDS } from './devAWSCreds.js'
// Set the AWS Region.
const REGION = "eu-central-1";
    // Create an Amazon S3 service client object.


const cognitoClient = () => {
    if(process.env.IS_PROD == "true") {
        return new CognitoIdentityProviderClient({ region: REGION});
    } else {
        return new CognitoIdentityProviderClient({ region: REGION});

        // return new CognitoIdentityProviderClient({ region: REGION , credentials: CREDS});
    }
}

export { cognitoClient };

