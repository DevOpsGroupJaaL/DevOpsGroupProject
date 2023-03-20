import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from './libs/cognitoClient.js'

const GetCurrentUser = (accessToken) => {
    const client = cognitoClient;
    console.log(accessToken)
    const command = new GetUserCommand(accessToken);

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
