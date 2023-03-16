import './App.css';
import 'antd/dist/reset.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Layout } from 'antd';
import GlobalHeader from './global-header.js';
import Dashboard from './dashboard.js';
import {StepsComponent, StepsFooter }from './steps.js';

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