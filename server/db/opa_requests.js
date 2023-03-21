import dotenv from 'dotenv'
dotenv.config(); //module loading environment variables from .env file
import fetch from "node-fetch";

const OPA_URL = "http://opa-s-publi-zal2vmv91eh1-1427543192.eu-central-1.elb.amazonaws.com"

const UploadOpaDataBackend = (request, response) => { //assigning anonymous function to constant

    fetch(`${OPA_URL}/policy`,
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
      }
    );
}

const RetrieveOpaDataBackend = (request, response) => { //assigning anonymous function to constant
  fetch(`${OPA_URL}/request`,
      {
        method: 'GET',
        headers: {
          'group': request.body.group,
          'resource': request.body.resource
        }
      }
     ).then((response) => response.status)
      .then((body) => {
        response.set('Content-Type', 'application/json');
        response.status(body).json({"policy": "retrieved"});
      }
    );
}


export default {
    UploadOpaDataBackend,
    RetrieveOpaDataBackend
};
