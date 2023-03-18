import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from './libs/cognitoClient.js'

const GetCurrentUser = (accessToken) => {
    const client = cognitoClient;

    const command = new GetUserCommand({AccessToken: accessToken});

    client.send(command).then(
      (data) => {
        return data.UserAttributes;
    },
      (error) => {
        console.log(error);
      }
    );
};

export { GetCurrentUser };
