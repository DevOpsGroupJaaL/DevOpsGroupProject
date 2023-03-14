import {Image, Typography} from 'antd';
const { Text } = Typography;

const Logo = () => {
    return (
        <div>
            {/* <Image src='/SignSealLogo.jpg' height={50} width={50} preview={false}/> */}
            {/* <Text style={{ color: '#ffffff', fontSize: 18, fontFamily: 'Roboto', lineHeight: '32%' }}>SignSeal.Systems</Text> */}
            <Image src='/SignSealLogo.png' height={48} width={207} preview={false}/>
        </div>
    );
};

export default Logo;