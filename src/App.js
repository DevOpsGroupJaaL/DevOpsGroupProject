import "./App.css";
import "antd/dist/reset.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import GlobalHeader from "./global-header.js";
import Dashboard from "./dashboard.js";
import { StepsComponent, StepsFooter } from "./steps.js";
import UploadComponent from "./addFile1.js";
import MyDocument from "./addFile2.js";
import CertModal from './certificationPasswordModal.js';

const { Content, Footer } = Layout;

const App = () => {
	const [currentFooter, setCurrentFooter] = useState(0);
  const [pdfFile, setPdfFile] = useState([]);
  const [pdfName, setPdfName] = useState([]);
  const [nextButton, setNextButton] = useState(false);
  const [certificatePass, setCertificatePassword] = useState(null);
	const [certModalVisible, setCertModalVisible] = useState(false);

	if (certModalVisible) {
		// TODO: replace with logic checking for logged in user
		// setCertModalVisible(true);
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

  return (
    <BrowserRouter>
      <div className="App">
        <Layout style={{ minHeight: "100vh" }}>
          <GlobalHeader />
          <Content>
          <CertModal isModalOpen={certModalVisible} setIsModalOpen={setCertModalVisible} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
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
