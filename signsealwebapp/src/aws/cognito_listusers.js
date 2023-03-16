import { ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from './libs/cognitoClient';
const ListUsers = (poolID) => {

    const client = cognitoClient;

    const params = {
      UserPoolId: poolID,
    };

    const command = new ListUsersCommand(params);

    client.send(command).then(
      (data) => {
        console.log(data.Users[0]);
        return data.Users
      },
      (error) => {
        console.log(error);
      }
    );
};



ListUsers("eu-central-1_CNF5aGqUw");
export default ListUsers;





