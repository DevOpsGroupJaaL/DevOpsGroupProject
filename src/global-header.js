import { Layout } from "antd";
import Logo from "./logo.js";
import Logout from "./logout.js";
import {Row, Col} from "antd";
// import './global-header.css';
const { Header } = Layout;
// const { Text } = Typography;

const GlobalHeader = () => {
  return (
    <Header
      className="temp"
      align="left"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
      }}
    >
      <Row>
        <Col span={2}>
          <Logo />
        </Col>
        <Col span={2} offset={20}>
          <Logout />
        </Col>
      </Row>
    </Header>
  );
};

export default GlobalHeader;
