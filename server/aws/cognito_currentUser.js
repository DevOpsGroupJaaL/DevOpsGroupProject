import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from './libs/cognitoClient.js'

const GetCurrentUser = (accessToken) => {
    const client = cognitoClient;
    const params = {
      AccessToken: accessToken
    };
    const command = new GetUserCommand(params);

    return client.send(command).then(
      (data) => {
        return {
          username: data.Username,
          name: data.UserAttributes.filter(x => x.Name == 'name')[0].Value,
          email: data.UserAttributes.filter(x => x.Name == 'email')[0].Value
        };
    },
      (error) => {
        console.log(error);
      }
    );
};

export { GetCurrentUser };
