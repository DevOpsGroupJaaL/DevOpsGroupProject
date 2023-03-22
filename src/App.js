import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import GlobalHeader from "./global-header.js";
import Dashboard from "./dashboard.js";
import { StepsComponent, StepsFooter } from "./steps.js";
import UploadComponent from "./addFile1.js";
import MyDocument from "./addFile2.js";
import CertModal from "./certificationPasswordModal.js";
import React, { useState, useEffect } from "react";
import { checkTokens } from "./auth.js";
import { AccessDenied } from "./accessDenied.js";

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
  const [currentUser, setCurrentUser] = useState([]);

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
          currentUser={currentUser}
        />
      ),
    },
    {
      step: 2,
      title: "View",
      content: (
        <MyDocument pdfFile={pdfFile} pdfName={null} documentType="local" currentUser={currentUser} checkPermissions={false}/>
      ),
    },
    {
      step: 3,
      title: "Review",
      content: (
        <MyDocument pdfFile={null} pdfName={pdfName} documentType="aws" currentUser={currentUser} checkPermissions={false}/>
      ),
    },
  ];

  const urlParams = new URLSearchParams(window.location.search);
  useEffect( () => {
    checkTokens(
      setHasToken,
      setIsLoggedIn,
      setCurrentUser,
      currentUser,
      isLoggedIn
    );
    checkNewAccount();
  }, [currentUser]);


  const checkNewAccount = () => {
    if (currentUser.email) {
      fetch(`/api/users/${currentUser.email}`)
        .then((response) => {
          if (response.status === 404) {
            setCertModalVisible(true);
          }
          else if (response.status === 200) {
            setCertModalVisible(false);
          }
        })
    }
  }


  return (
    <BrowserRouter>
      <div className="App">
        <Layout style={{ minHeight: "100vh" }}>
          <GlobalHeader currentUser={currentUser} />
          <Content>
            <CertModal
              isModalOpen={certModalVisible}
              setIsModalOpen={setCertModalVisible}
              user = {currentUser}
            />
            <Row>
              <Col xs={{ span: 24, offset: 0 }}  xl={{ span: 16, offset: 4 }} >
                <Routes>
                  <Route path="/" element={<Dashboard currentUser={currentUser}/>} />
                  <Route path="/accessDenied" element={<AccessDenied/>} />
                  <Route path="/dashboard/*" element={<Dashboard currentUser={currentUser}/>} />
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
                        currentUser={currentUser}
                      />
                    }
                  />
                  <Route path="/view/*" element={<MyDocument pdfFile={null} pdfName={urlParams.get('file')} documentType="aws" currentUser={currentUser} checkPermissions={true}/>} />
                </Routes>
              </Col>
            </Row>
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
}
export default App;
