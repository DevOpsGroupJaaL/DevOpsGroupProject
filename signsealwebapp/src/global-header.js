import { Layout } from 'antd';
import Logo from './logo.js';
import Logout from './logout.js';
// import './global-header.css';
const { Header } = Layout;
// const { Text } = Typography;

const GlobalHeader = () => {
  return (
    <Header className='temp'
      align="left"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
      }}>
      <Logo/>
      <Logout/>
    </Header>
  );
};

export default GlobalHeader;
