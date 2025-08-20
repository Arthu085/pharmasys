import { Layout } from 'antd';
import React from 'react';
import Footer from './Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
}

const ScreenNoAuth: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{
      minHeight: '100vh',
      backgroundColor: '#e6f1f5'
    }}>
      {children && (
        <Content style={{ padding: '24px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {children}
        </Content>
      )}
      <Footer />
    </Layout>
  );
};

export default ScreenNoAuth;