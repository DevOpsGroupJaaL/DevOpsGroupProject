// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { Button } from 'antd';
import 'antd/dist/reset.css';
import GlobalHeader from './global-header.js';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => (
  <div className="App">
    <GlobalHeader />
  </div>
);

export default App;
