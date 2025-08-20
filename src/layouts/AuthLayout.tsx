import { Layout } from 'antd';
import React from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Layout style={{
      minHeight: '100vh',
      backgroundColor: '#e6f1f5'
    }}>
      <Content style={{ padding: '24px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default AuthLayout;