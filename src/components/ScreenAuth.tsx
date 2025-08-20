import { Layout } from 'antd';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
}

const ScreenAuth: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{
      minHeight: '100vh',
      backgroundColor: '#e6f1f5'
    }}>
      <Header />
      {children && (
        <Content style={{ padding: '24px 0', justifyItems: 'center', alignItems: 'center' }}>
          <div style={{
            background: '#fff',
            padding: 15,
            width: '90%',
            minHeight: '200px'
          }}>
            {children}
          </div>
        </Content>
      )}
      <Footer />
    </Layout>
  );
};

export default ScreenAuth;