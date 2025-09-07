import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { FileTextOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';

import Logo from '../assets/logo.svg';

const { Header: AntHeader } = Layout;

const items: MenuProps['items'] = [
  {
    label: 'Cadastros',
    key: 'registrations',
    icon: <ProfileOutlined style={{ fontSize: '22px' }} />,
    children: [
      {
        label: 'Empresa',
        key: 'empresRegistration',
      },
      {
        label: 'Item',
        key: 'itemRegistration',
      },
      {
        label: 'Estoque',
        key: 'stockRegistration',
      },
      {
        label: 'Prescritor',
        key: 'prescritorRegistration',
      },
      {
        label: 'Paciente',
        key: 'patientRegistration',
      },
    ],
  },
  {
    label: 'Relatórios',
    key: 'reports',
    icon: <FileTextOutlined style={{ fontSize: '22px' }} />,
    children: [
      {
        label: 'Empresa',
        key: 'empresReport'
      },
      {
        label: 'Movimento de Estoque',
        key: 'movementReport'
      },
      {
        label: 'Transferência',
        key: 'transferReport'
      },
      {
        label: 'Dispensação',
        key: 'dispensingReport'
      },
      {
        label: 'Vencimento',
        key: 'maturityReport'
      },
    ]
  },
  {
    label: 'Admnistração',
    key: 'adm',
    icon: <UserOutlined style={{ fontSize: '22px' }} />,
    children: [
      {
        label: 'Usuário',
        key: 'user'
      }
    ]
  },
  {
    label: 'Sair',
    key: 'logout',
    icon: <LogoutOutlined style={{ fontSize: '22px' }} />
  }
];

const Header: React.FC = () => {
  return (
    <AntHeader
      style={{
        backgroundColor: '#e6f1f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
        paddingBottom: '5px',
        margin: '0',
        height: 'auto',
      }}
    >
      <img src={Logo} alt="Pharmasys Logo" style={{ height: '90px', marginTop: '10px' }} />
      <Menu
        theme="light"
        mode="horizontal"
        items={items}
        style={{
          borderBottom: 'none',
          justifyContent: 'center',
          backgroundColor: '#e6f1f5',
          width: '100%',
          marginTop: '10px'
        }}
      />
    </AntHeader>
  );
};

export default Header;