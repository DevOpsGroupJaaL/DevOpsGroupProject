import {  GlobalSignOutCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from './libs/cognitoClient.js';


const logout = (accessToken) => {
    console.log(accessToken)
    const client = cognitoClient
    const params = {
        AccessToken: accessToken
      };

    const command = new GlobalSignOutCommand(params);

    client.send(command).then((data) => {
        return data
    },
    (error) => {
        console.log(error);
    }
    );
};


export { logout };
