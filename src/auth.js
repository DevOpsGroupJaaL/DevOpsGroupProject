import axios from "axios"
const USER_POOL_ID = "eu-central-1_6035S2gv9"
const CLIENT_ID = "5id33hkifarn1g675gknb4g546"
const AUTH_URL = 'https://signsealauth.auth.eu-central-1.amazoncognito.com/oauth2/token'
const LOGOUT_URL = 'https://signsealauth.auth.eu-central-1.amazoncognito.com/logout'
const LOGIN_URL = 'https://signsealauth.auth.eu-central-1.amazoncognito.com/login'
const setToken = async (authorizationCode) => {
    const token = {}
    const details = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: CLIENT_ID,
        // client_secret: '1ksm2tt5qmfhhg6u7238ovb4err2thes4sq3p39lemjbeit8o1a1',
        redirect_uri: 'http://localhost:3000/dashboard'
    };

    const formBody = Object.keys(details).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`).join("&");

    await axios.post(
        AUTH_URL,
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
    fetch('/api/cognito/logOut', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: localStorage.getItem('accessToken') })
    }).then((res) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');
        redirectLogin()

    }).catch((err) => {
        console.log(err);
    });
}

const getCurrentUser = async () => {
    fetch('/api/cognito/currentUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: localStorage.getItem('accessToken') })
    })
    .then((x) => x.json())
    .then((res) => {
        console.log(res)
        return res.body
    }).catch((err) => {
        console.log(err);
    });
}

const redirectLogin = async () => {
    const appClientId = CLIENT_ID;
    const redirectUri = encodeURI('http://localhost:3000/dashboard');
    const authEndpoint = `${LOGIN_URL}?client_id=${appClientId}&response_type=code&scope=aws.cognito.signin.user.admin&redirect_uri=${redirectUri}`;
    window.location.href = authEndpoint;
}

export { setToken, logout, getCurrentUser, redirectLogin };
