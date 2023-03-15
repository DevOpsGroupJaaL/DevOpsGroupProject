// import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { Button } from 'antd';
import 'antd/dist/reset.css';
import { listObjects } from './aws/s3_listobjects.js';
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

const App = () => {
  useEffect(() => {
    listObjects.get()
  }, []);


  return (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);
}





export default App;
