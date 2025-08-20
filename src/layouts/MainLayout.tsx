import { Layout } from 'antd';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Layout style={{
      minHeight: '100vh',
      backgroundColor: '#e6f1f5'
    }}>
      <Header />
      <Content style={{ padding: '24px 0', justifyItems: 'center', alignItems: 'center' }}>
        <div style={{
          background: '#fff',
          padding: 15,
          width: '90%',
          minHeight: '200px'
        }}>
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;