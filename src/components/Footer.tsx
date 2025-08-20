import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center', backgroundColor: '#e6f1f5' }}>
      PharmaSys ©2025 Created by Arthur
    </AntFooter>
  );
};

export default Footer;