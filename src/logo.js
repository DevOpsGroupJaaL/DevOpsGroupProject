import {Image} from 'antd';
// const { Text } = Typography;

const Logo = () => {
    return (
        <div>
         <a href='/'>
            <Image src='/SignSealLogo.png' height={48} width={207} preview={false} />
            </a>
        </div>
    );
};

export default Logo;
