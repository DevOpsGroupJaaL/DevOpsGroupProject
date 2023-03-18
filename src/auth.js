import axios from "axios";
const getToken = async (authorizationCode) => {
    console.log(authorizationCode);
    const token = {}
    const details = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: 'mevtf1fkfoarqpgn79s4ade6t',
        client_secret: '1ksm2tt5qmfhhg6u7238ovb4err2thes4sq3p39lemjbeit8o1a1',
        redirect_uri: 'http://localhost:3000/dashboard'
    };

    const formBody = Object.keys(details).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`).join("&");

    console.log(formBody);

    await axios.post(
        'https://signseal.auth.eu-central-1.amazoncognito.com/oauth2/token',
        formBody,
        {
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
            
        }
    }).then((res)=>{
        token.access_token = res.data.access_token;
        token.id_token = res.data.id_token;
        localStorage.setItem('accessToken', res.data.access_token);
        localStorage.setItem('idToken', res.data.id_token);
        return token;
    }).catch((err)=>{
        console.log(err);
    });
}

const logout = async () => {
    const details = {
        response_type: 'code',
        client_secret: '1ksm2tt5qmfhhg6u7238ovb4err2thes4sq3p39lemjbeit8o1a1',
        client_id: 'mevtf1fkfoarqpgn79s4ade6t',
        logout_uri: 'http://localhost:3000/',
        redirect_uri: 'http://localhost:3000/'
    };

    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');

    const formBody = Object.keys(details).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`).join("&");

    const authEndpoint = `https://signseal.auth.eu-central-1.amazoncognito.com/logout?${formBody}`;
    await axios.get(authEndpoint, {headers: {'Access-Control-Allow-Origin': '*' }})

}

export { getToken, logout };