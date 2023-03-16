import './App.css';
import React from 'react';
import 'antd/dist/reset.css';
import GlobalHeader from './global-header.js';
// import UploadComponent from './addFile1.js';
// import StepsComponent from './steps.js';
import Dashboard from './dashboard.js';
import { Layout } from 'antd';
import GetCurrentUser from './aws/cognito_currentUser'; // for future use
// import MyDocument from './addFile2.js';



const App = () => {
  return (
  <div className="App">
    <Layout>
    <GlobalHeader />
    {/* <UploadComponent /> */}
    {/* <StepsComponent /> */}
    <Dashboard />
    {/* <MyDocument/> */}
    </Layout>
  </div>
);
}





export default App;
