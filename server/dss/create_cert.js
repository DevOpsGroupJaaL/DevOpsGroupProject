
import {DssEndpoint} from "./dss_client.js";


const createCertificate = (userName, fullName, certificatePass) => {
return fetch(`${DssEndpoint}/certificate`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'full_name': fullName,
            'password': certificatePass,
            'username': userName
        })
    }).then((resp) => {
        return resp.status
    })
}

export {createCertificate}
