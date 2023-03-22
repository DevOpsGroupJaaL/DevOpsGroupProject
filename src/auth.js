import axios from "axios"
const CLIENT_ID = "5id33hkifarn1g675gknb4g546"
const AUTH_URL = 'https://signsealauth.auth.eu-central-1.amazoncognito.com/oauth2/token'
const LOGIN_URL = 'https://signsealauth.auth.eu-central-1.amazoncognito.com/login'

const PORTAL_URL = () => {
    console.log(process.env.IS_PROD)
    if(process.env.IS_PROD == "true") {
        return "http://signseal.systems"
    } else {
        return "http://localhost:3000"
    }
}

const checkTokens = async (setHasToken, setIsLoggedIn, setCurrentUser, currentUser, isLoggedIn) => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");
      if (
        localStorage.getItem("accessToken") &&
        localStorage.getItem("idToken")
      ) {
        setHasToken(true);
        setIsLoggedIn(true);
        if(currentUser === undefined  || Object.keys(currentUser).length === 0) {
            getCurrentUser(setCurrentUser, setHasToken, setIsLoggedIn)
        }

      } else {
        // If the user is not logged in and there is no authorization code, redirect to login
        if (!isLoggedIn && !authorizationCode) {
            redirectLogin();
            setIsLoggedIn(true);
        } // If there is a token in the URL, set the token and set the current user

        if (authorizationCode ) {
          setToken(authorizationCode).then(() => {
            setHasToken(true);
            setIsLoggedIn(true);
            window.location.href = '/dashboard'
          });
        }
        // If none of the above, set the current user
        else if (Object.keys(currentUser).length === 0) {
            getCurrentUser(setCurrentUser, setHasToken, setIsLoggedIn)
        }

      }
}

const setToken = async (authorizationCode) => {
    const token = {}
    const details = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: CLIENT_ID,
        redirect_uri: `${PORTAL_URL()}/dashboard`
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

const getCurrentUser = async (setCurrentUser, setHasToken, setIsLoggedIn) => {
    fetch('/api/cognito/currentUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: localStorage.getItem('accessToken') })
    })
    .then((x) => x.json())
    .then((res) => {
        setCurrentUser(JSON.parse(res));
        setHasToken(true);
        setIsLoggedIn(true);
        return res.body
    }).catch((err) => {
        console.log(err);
    });
}

const redirectLogin = async () => {
    const appClientId = CLIENT_ID;
    const redirectUri = encodeURI(`${PORTAL_URL()}/dashboard`);
    const authEndpoint = `${LOGIN_URL}?client_id=${appClientId}&response_type=code&scope=aws.cognito.signin.user.admin&redirect_uri=${redirectUri}`;
    window.location.href = authEndpoint;
}

export { logout, redirectLogin, checkTokens };
