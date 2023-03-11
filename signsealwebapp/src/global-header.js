import { Layout } from 'antd';
import Logo from './logo.js'
const { Header } = Layout;
// const { Text } = Typography;

const GlobalHeader = () => {
  return (
    // <Header style={{ backgroundColor: '#040404' }}>
    //   {/* <Space align="center"> */}
    //     <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    //       <Image src="" height={32} width={32} />
    //       <Text style={{ color: '#ffffff', fontSize: 18, fontFamily: 'Roboto', lineHeight: '32%' }}>SignSeal.Systems</Text>
    //     </div>
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <div style={{ padding: '0px 12px', backgroundColor: 'rgba(255, 255, 255, 0.000009999999747378752)' }}>
    //         <Image src="" height={14} width={14} />
    //       </div>
    //     </div>
    //   {/* </Space> */}
    // </Header>

        <Layout>
          <Header
            align="left"
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
            }}
          >
        {/* //     <Image src='/logo512.png' height={32} width={32} preview={false}/>
        //     <Text style={{ color: '#ffffff', fontSize: 18, fontFamily: 'Roboto', lineHeight: '32%' }}>SignSeal.Systems</Text> */}
                <Logo/>

          </Header>
        </Layout>
  );
};

export default GlobalHeader;
