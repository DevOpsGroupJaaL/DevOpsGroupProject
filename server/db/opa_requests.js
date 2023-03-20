import dotenv from 'dotenv'
dotenv.config(); //module loading environment variables from .env file
import fetch from "node-fetch";


const UploadOpaDataBackend = (request, response) => { //assigning anonymous function to constant

    console.log(request.body);
    fetch('http://opa-s-publi-zal2vmv91eh1-1427543192.eu-central-1.elb.amazonaws.com/policy',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request.body)
      }
     ).then((response) => response.text())
      .then((body) => {
        response.set('Content-Type', 'application/json');
        response.status(200).json({ body });
        console.log(body);
      }
    );
}

const RetrieveOpaDataBackend = (request, response) => { //assigning anonymous function to constant
    fetch('http://opa-s-publi-zal2vmv91eh1-1427543192.eu-central-1.elb.amazonaws.com/request',
      {
        method: 'GET',
        headers: {
          'group': request.body.group,
          'resource': request.body.resource
        }
      }
     ).then((response) => response.status)
      .then((body) => {
        // console.log(response);
        response.set('Content-Type', 'application/json');
        response.status(body).json({"policy": "retrieved"});
        console.log(body);
      }
    );
}


export default {
    UploadOpaDataBackend,
    RetrieveOpaDataBackend
};
