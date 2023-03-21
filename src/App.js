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
      console.log("checking new account");
      fetch(`/api/users/${currentUser.email}`)
        .then((response) => {
          if (response.status === 404) {
            console.log("new account")
            setCertModalVisible(true);
          }
          else if (response.status === 200) {
            console.log("old account")
            setCertModalVisible(false);
          }
        })
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Layout style={{ minHeight: "100vh" }}>
          <GlobalHeader />
          <Content>
            <CertModal
              isModalOpen={certModalVisible}
              setIsModalOpen={setCertModalVisible}
              user = {currentUser}
            />
            <Row>
              <Col xs={{ span: 24, offset: 0 }} xl={{ span: 12, offset: 6 }} >
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
};
export default App;
