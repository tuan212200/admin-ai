// src/pages/admin/Admin.jsx
import React, { useState } from 'react';
import { 
  Layout, 
  Menu, 
  Button, 
  theme, 
  Avatar, 
  Dropdown,
  Space,
  Modal,
  message
} from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  DashboardOutlined, 
  UserOutlined, 
  SettingOutlined, 
  ShoppingCartOutlined, 
  FileOutlined,
  BellOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Import page components
import Users from '../Users';
import Products from '../Products';
import Reports from '../Reports';
import Settings from '../Settings';
import Login from '../Login';

const { Header, Sider, Content, Footer } = Layout;

// Extract Dashboard content to a separate component
const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user } = useAuth();

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <h2>Welcome back, {user?.name || 'User'}!</h2>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: '1 1 220px', minWidth: '220px' }}>
            <div style={{ 
              padding: '24px', 
              background: 'linear-gradient(135deg, #ffffff, #f0f7ff)', 
              borderRadius: '12px', 
              textAlign: 'center',
              boxShadow: '0 6px 16px rgba(24, 144, 255, 0.08)',
              border: '1px solid rgba(24, 144, 255, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)',
              overflow: 'hidden',
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(24, 144, 255, 0.12)'
              }
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle at top right, rgba(24, 144, 255, 0.1), transparent 70%)',
                borderRadius: '0 0 0 100%',
                zIndex: 0
              }}></div>
              <UserOutlined style={{ 
                fontSize: '36px', 
                color: '#1890ff', 
                marginBottom: '12px',
                background: 'rgba(24, 144, 255, 0.1)',
                padding: '16px',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.15)',
                position: 'relative',
                zIndex: 1
              }} />
              <h3 style={{ fontSize: '28px', margin: '12px 0', fontWeight: 'bold', color: '#262626', position: 'relative', zIndex: 1 }}>1,128</h3>
              <p style={{ color: '#8c8c8c', margin: 0, fontSize: '15px', position: 'relative', zIndex: 1 }}>Active Users</p>
            </div>
          </div>
          <div style={{ flex: '1 1 220px', minWidth: '220px' }}>
            <div style={{ 
              padding: '24px', 
              background: 'linear-gradient(135deg, #ffffff, #f0f7ff)', 
              borderRadius: '12px', 
              textAlign: 'center',
              boxShadow: '0 6px 16px rgba(24, 144, 255, 0.08)',
              border: '1px solid rgba(24, 144, 255, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)',
              overflow: 'hidden',
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(24, 144, 255, 0.12)'
              }
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle at top right, rgba(82, 196, 26, 0.1), transparent 70%)',
                borderRadius: '0 0 0 100%',
                zIndex: 0
              }}></div>
              <ShoppingCartOutlined style={{ 
                fontSize: '36px', 
                color: '#52c41a', 
                marginBottom: '12px',
                background: 'rgba(82, 196, 26, 0.1)',
                padding: '16px',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(82, 196, 26, 0.15)',
                position: 'relative',
                zIndex: 1
              }} />
              <h3 style={{ fontSize: '28px', margin: '12px 0', fontWeight: 'bold', color: '#262626', position: 'relative', zIndex: 1 }}>93</h3>
              <p style={{ color: '#8c8c8c', margin: 0, fontSize: '15px', position: 'relative', zIndex: 1 }}>Products</p>
            </div>
          </div>
          <div style={{ flex: '1 1 220px', minWidth: '220px' }}>
            <div style={{ 
              padding: '24px', 
              background: 'linear-gradient(135deg, #ffffff, #f0f7ff)', 
              borderRadius: '12px', 
              textAlign: 'center',
              boxShadow: '0 6px 16px rgba(24, 144, 255, 0.08)',
              border: '1px solid rgba(24, 144, 255, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)',
              overflow: 'hidden',
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(24, 144, 255, 0.12)'
              }
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle at top right, rgba(250, 140, 22, 0.1), transparent 70%)',
                borderRadius: '0 0 0 100%',
                zIndex: 0
              }}></div>
              <DashboardOutlined style={{ 
                fontSize: '36px', 
                color: '#fa8c16', 
                marginBottom: '12px',
                background: 'rgba(250, 140, 22, 0.1)',
                padding: '16px',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(250, 140, 22, 0.15)',
                position: 'relative',
                zIndex: 1
              }} />
              <h3 style={{ fontSize: '28px', margin: '12px 0', fontWeight: 'bold', color: '#262626', position: 'relative', zIndex: 1 }}>2,398</h3>
              <p style={{ color: '#8c8c8c', margin: 0, fontSize: '15px', position: 'relative', zIndex: 1 }}>Daily Visits</p>
            </div>
          </div>
          <div style={{ flex: '1 1 220px', minWidth: '220px' }}>
            <div style={{ 
              padding: '24px', 
              background: 'linear-gradient(135deg, #ffffff, #f0f7ff)', 
              borderRadius: '12px', 
              textAlign: 'center',
              boxShadow: '0 6px 16px rgba(24, 144, 255, 0.08)',
              border: '1px solid rgba(24, 144, 255, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)',
              overflow: 'hidden',
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(24, 144, 255, 0.12)'
              }
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle at top right, rgba(245, 34, 45, 0.1), transparent 70%)',
                borderRadius: '0 0 0 100%',
                zIndex: 0
              }}></div>
              <FileOutlined style={{ 
                fontSize: '36px', 
                color: '#f5222d', 
                marginBottom: '12px',
                background: 'rgba(245, 34, 45, 0.1)',
                padding: '16px',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(245, 34, 45, 0.15)',
                position: 'relative',
                zIndex: 1
              }} />
              <h3 style={{ fontSize: '28px', margin: '12px 0', fontWeight: 'bold', color: '#262626', position: 'relative', zIndex: 1 }}>42</h3>
              <p style={{ color: '#8c8c8c', margin: 0, fontSize: '15px', position: 'relative', zIndex: 1 }}>Reports</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '20px', 
          marginBottom: '16px', 
          fontWeight: '600',
          borderBottom: '2px solid #f0f0f0',
          paddingBottom: '8px'
        }}>Recent Activity</h3>
        <div style={{ 
          padding: '24px', 
          background: 'linear-gradient(135deg, #ffffff, #f9f9f9)', 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          border: '1px solid #eaeaea'
        }}>
          <p style={{ fontSize: '15px', lineHeight: '1.6' }}>Welcome to the <span style={{ fontWeight: 'bold', color: '#1890ff' }}>Kido Admin Dashboard!</span> This is your central hub for managing your business.</p>
          <p style={{ fontSize: '15px', lineHeight: '1.6' }}>Navigate using the menu on the left to access different sections of the admin panel.</p>
          <p style={{ fontSize: '15px', lineHeight: '1.6' }}>For quick access to key metrics, refer to the statistics cards above.</p>
        </div>
      </div>
    </Content>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Function to determine which menu item is selected based on current path
  const useMenuSelection = () => {
    const location = useLocation();
    const pathname = location.pathname;
    
    if (pathname === '/') return ['1'];
    if (pathname === '/users') return ['2'];
    if (pathname === '/products') return ['3'];
    if (pathname === '/reports') return ['4'];
    if (pathname === '/settings') return ['5'];
    
    return ['1']; // Default to dashboard
  };

  const handleLogout = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to log out?',
      onOk: () => {
        logout();
        message.success('Logged out successfully');
        navigate('/login');
      },
      okText: 'Logout',
      cancelText: 'Cancel',
    });
  };

  const userMenuItems = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: () => navigate('/settings'),
    },
    {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => navigate('/settings'),
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  // Define menu items for the sidebar
  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: '3',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/products">Products</Link>,
    },
    {
      key: '4',
      icon: <FileOutlined />,
      label: <Link to="/reports">Reports</Link>,
    },
    {
      key: '5',
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
  ];

  const MenuWrapper = () => {
    const selectedKeys = useMenuSelection();
    
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        selectedKeys={selectedKeys}
        items={menuItems}
      />
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
          background: 'linear-gradient(180deg, #001529 0%, #002140 100%)',
          zIndex: 999
        }}
      >
        <div className="logo" style={{ 
          height: 64, 
          margin: '16px auto',
          width: collapsed ? 50 : 160,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(5px)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: collapsed ? '16px' : '20px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease'
        }}>
          {collapsed ? 'KD' : 'KIDO ADMIN'}
        </div>
        <MenuWrapper />
      </Sider>
      <Layout style={{ 
        marginLeft: collapsed ? 80 : 200, 
        transition: 'all 0.3s ease',
        background: '#f5f7fa'
      }}>
        <Header
          style={{
            padding: 0,
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            height: 64,
            borderBottom: '1px solid #f0f0f0',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
            <Button type="text" icon={<BellOutlined />} style={{ marginRight: 12 }} />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
                <span>{user?.name || 'Admin User'}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        
        <Footer style={{ textAlign: 'center' }}>
          Kido Admin ©{new Date().getFullYear()} Created by Kido Team
        </Footer>
      </Layout>
    </Layout>
  );
};

const Admin = () => {
  const { user, login } = useAuth();
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={login} /> : <Navigate to="/" replace />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default Admin;