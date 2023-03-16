import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from './libs/cognitoClient.js'

const GetCurrentUser = () => {
    const client = cognitoClient;

    const command = new GetUserCommand({});

    client.send(command).then(
      (data) => {
        console.log(data);
        return data.UserAttributes;
    },
      (error) => {
        console.log(error);
      }
    );
};

export default GetCurrentUser;
