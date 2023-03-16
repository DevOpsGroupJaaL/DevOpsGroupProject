import './App.css';
import 'antd/dist/reset.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Layout } from 'antd';
import GlobalHeader from './global-header.js';
import Dashboard from './dashboard.js';
import {StepsComponent, StepsFooter }from './steps.js';
import GlobalFooter from './global-footer.js';
// import { Footer } from 'antd/es/layout/layout.js';
// import MyDocument from './addFile2.js';
// import UploadComponent from './addFile1.js';

// const App = () => { return (
//   <div className="App">
//     <Layout>
//     <GlobalHeader />
//     <Dashboard />
//     {/* <StepsComponent /> */}
//     {/* <UploadComponent /> */}
//     {/* <MyDocument/> */}
//     </Layout>
//   </div>
// );
// };

const {Content, Footer}  = Layout;


const App = () =>{ 
  const [currentFooter, setCurrentFooter] = useState(0);

  return (
    <BrowserRouter>
        <div className="App">
          <Layout style={{ minHeight: "100vh" }}>
          <GlobalHeader/>
          <Content>
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/upload" element={<StepsComponent setCurrentFooter={setCurrentFooter}/>}/>
            </Routes>
          </Content>
            
        
          <Footer>
            <Routes>
              <Route path="/upload" element={<StepsFooter currentFooter={currentFooter}/>}/>
            </Routes>
          </Footer>
          </Layout>
        </div>
    </BrowserRouter>
);};

export default App;
