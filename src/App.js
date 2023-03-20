import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Button } from "antd";
import GlobalHeader from "./global-header.js";
import Dashboard from "./dashboard.js";
import { StepsComponent, StepsFooter } from "./steps.js";
import UploadComponent from "./addFile1.js";
import MyDocument from "./addFile2.js";
import CertModal from './certificationPasswordModal.js';
import React, { useState, useEffect } from 'react';
import { getToken, logout, getCurrentUser } from './auth.js';

const { Content, Footer } = Layout;

const App = () => {
  const [currentFooter, setCurrentFooter] = useState(0);
  const [pdfFile, setPdfFile] = useState([]);
  const [pdfName, setPdfName] = useState([]);
  const [nextButton, setNextButton] = useState(false);
  const [certificatePass, setCertificatePassword] = useState(null);
	const [certModalVisible, setCertModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const tokenLoaded = false;

	if (certModalVisible) {
		// TODO: replace with logic checking for logged in user
		setCertModalVisible(false);
	}
  const steps = [
    {
      step: 1,
      title: "Upload",
      content: (
        <UploadComponent
          setNextButton={setNextButton}
          setPdfFile={setPdfFile}
          setPdfName={setPdfName}
          setCertificatePassword={setCertificatePassword}
        />
      ),
    },
    {
      step: 2,
      title: "View",
      content: (
        <MyDocument pdfFile={pdfFile} pdfName={null} documentType="local" />
      ),
    },
    {
      step: 3,
      title: "Review",
      content: (
        <MyDocument pdfFile={null} pdfName={pdfName} documentType="aws" />
      ),
    },
  ];


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
    // setHasToken(false)
    if(localStorage.getItem('accessToken') && localStorage.getItem('idToken')) {
      setHasToken(true);
      setIsLoggedIn(true);

      getCurrentUser().then((data) => {
        setCurrentUser(data)
      });
    } else {
    if (!isLoggedIn && !authorizationCode) {
      handleLogin();
      // setIsLoggedIn(true);
      // setHasToken(true);
    }
    if (authorizationCode) {
      getToken(authorizationCode).then(() => {
        setHasToken(true);
        setIsLoggedIn(true);
        getCurrentUser().then((data) => {
          setCurrentUser(data)
        });
      });
    } else if (currentUser == {}) {
      getCurrentUser().then((data) => {
        setCurrentUser(data)
      });
    }
  }
  }, [hasToken]);



  const handleLogin = () => {
    const appClientId = 'mevtf1fkfoarqpgn79s4ade6t';
    const redirectUri = 'http://localhost:3000/dashboard';
    const authEndpoint = `https://signseal.auth.eu-central-1.amazoncognito.com/login?client_id=${appClientId}&response_type=code&scope=email+openid&redirect_uri=${redirectUri}`;
    window.location.href = authEndpoint;
    setIsLoggedIn(true);
  };

if(hasToken) {
  return (
    // ternary if
    // (hasToken & isLoggedIn) ? (
    <BrowserRouter>
      <div className="App">
        <Layout style={{ minHeight: "100vh" }}>
          <GlobalHeader />
          <Content>
          <CertModal isModalOpen={certModalVisible} setIsModalOpen={setCertModalVisible} />
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
              <Route
                path="/upload"
                element={
                  <StepsComponent
                    nextButton={nextButton}
                    steps={steps}
                    setCurrentFooter={setCurrentFooter}
                    certificatePass={certificatePass}
                    pdfName={pdfName}
                    setPdfFile={setPdfFile}
                  />
                }
              />
            </Routes>
            <Button onClick={logout}>Logout</Button>
            <div>
              {/* {console.log({})} */}
            </div>
          </Content>

          <Footer>
            <Routes>
              <Route
                path="/upload"
                element={
                  <StepsFooter steps={steps} currentFooter={currentFooter} />
                }
              />
            </Routes>
          </Footer>
        </Layout>
      </div>
    </BrowserRouter>
  );
};
}
export default App;
