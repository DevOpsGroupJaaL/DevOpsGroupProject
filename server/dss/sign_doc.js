import {DssEndpoint} from "./dss_client.js";


const signDocument = (fileName, userName, fullName, certificatePass) => {
fetch(`${DssEndpoint}/sign`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "certificate_pass": certificatePass,
        "document_dir": fileName,
        "name": fullName,
        "username": userName
    })
    }).then((resp) => {
        console.log("=======reply")
        console.log(resp.status)
        return resp.status
    })
}

export {signDocument}
