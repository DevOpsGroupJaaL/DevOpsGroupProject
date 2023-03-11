import {Image, Typography} from 'antd';
const { Text } = Typography;

const Logo = () => {
    return (
        <div>
            <Image src='/logo512.png' height={32} width={32} preview={false}/>
            <Text style={{ color: '#ffffff', fontSize: 18, fontFamily: 'Roboto', lineHeight: '32%' }}>SignSeal.Systems</Text>
        </div>
    );
};

export default Logo;