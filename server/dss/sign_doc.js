import {DssEndpoint} from "./dss_client.js";
import fetch from 'node-fetch';

const signDocument = (fileName, userName, fullName, certificatePass) => {
    return fetch(`${DssEndpoint}/sign`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        'certificate_pass': certificatePass,
        'document_dir': fileName,
        'name': fullName,
        'username': userName
    })
    }).then((resp) => {
        return resp.status
    })
}

export {signDocument}
