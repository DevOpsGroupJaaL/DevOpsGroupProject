import { ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from './libs/cognitoClient.js';
const ListUsers = () => {
    const POOL_ID = "eu-central-1_CNF5aGqUw";
    const client = cognitoClient();

    const params = {
      UserPoolId: POOL_ID,
    };

    const command = new ListUsersCommand(params);
    client.send(command).then(
      (data) => {
        return data.Users
      },
      (error) => {
        console.log(error);
      }
    );
};



ListUsers();
export default ListUsers;





