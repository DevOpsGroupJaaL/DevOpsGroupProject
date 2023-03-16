import {Image} from 'antd';
// const { Text } = Typography;

const Logo = () => {
    return (
        <div>
            {/* <Image src='/SignSealLogo.jpg' height={50} width={50} preview={false}/> */}
            {/* <Text style={{ color: '#ffffff', fontSize: 18, fontFamily: 'Roboto', lineHeight: '32%' }}>SignSeal.Systems</Text> */}
            <a href='/'>
            <Image src='/SignSealLogo.png' height={48} width={207} preview={false} />
            </a>
        </div>
    );
};

export default Logo;