import {DssEndpoint} from "./dss_client.js";

const signDocument = (fileName, userName, fullName, certificatePass) => {
    console.log(fileName);
    console.log(userName);
    console.log(fullName);
    console.log(certificatePass);
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
