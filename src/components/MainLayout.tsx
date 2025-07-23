import { useState } from 'react';
import { Layout, Menu, Button, Typography } from 'antd';
import {
  UserOutlined,
  AppstoreOutlined,
  BankOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { useAppStore } from '../store/appStore';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

// URLのパスとメニューキーを対応させるための定義
const pathToKeyMap: { [key: string]: string } = {
  '/': '1',
  '/customers': '2',
  '/products': '3',
  '/company': '4',
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, logout } = useAppStore();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const selectedKey = pathToKeyMap[location.pathname] || '1';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">ダッシュボード</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/customers">顧客管理</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />}>
            <Link to="/products">商品管理</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BankOutlined />}>
            <Link to="/company">発行元管理</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Title level={4} style={{ margin: 0 }}>業務効率化アプリ</Title>
            <div>
                <span style={{ marginRight: 16 }}>ようこそ、{currentUser?.username}さん</span>
                <Button type="primary" danger onClick={logout}>
                    ログアウト
                </Button>
            </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: 8 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Invoice App ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
