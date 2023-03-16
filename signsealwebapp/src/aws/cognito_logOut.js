import {  GlobalSignOutCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from './libs/cognitoClient';


const handleLogout = () => {
const client = cognitoClient

const command = new GlobalSignOutCommand({});

client.send(command).then(
    (data) => {
    console.log(data);
    // clear user session and redirect to login page
    },
    (error) => {
    console.log(error);
    }
);
};


export default handleLogout;
