import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar, 
  Button, 
  Dropdown, 
  Modal, 
  message,
  Badge,
  theme,
  Divider,
  Space,
  Tooltip,
  Input
} from 'antd';
import {
  DashboardOutlined, 
  UserOutlined, 
  SettingOutlined, 
  ShoppingCartOutlined, 
  FileOutlined,
  BellOutlined,
  LogoutOutlined,
  ToolOutlined,
  LockOutlined,
  SearchOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { useAuth } from '../../context/AuthContext';
import '@/App.css';

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();
  
  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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

  const userMenuItems = {
    items: [
      {
        key: 'profile',
        label: 'Profile',
        icon: <UserOutlined />,
        onClick: () => navigate('/settings'),
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: <SettingOutlined />,
        onClick: () => navigate('/settings'),
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined />,
        onClick: handleLogout,
      },
    ]
  };

  // Define menu items for the sidebar
  const menuItems = [
    {
      path: '/',
      name: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      path: '/users',
      name: 'Users',
      icon: <UserOutlined />,
      access: 'canAdmin',
      hideInMenu: !hasPermission(['admin', 'manager']),
    },
    {
      path: '/products',
      name: 'Products',
      icon: <ShoppingCartOutlined />,
      hideInMenu: !hasPermission(['admin', 'editor']),
    },
    {
      path: '/conversations',
      name: 'Conversations',
      icon: <FileOutlined />,
    },
    {
      path: '/reports',
      name: 'Reports',
      icon: <FileOutlined />,
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: <SettingOutlined />,
      hideInMenu: !hasPermission(['admin']),
    },
    {
      path: '/admin',
      name: 'Admin',
      icon: <ToolOutlined />,
      hideInMenu: !hasPermission(['admin']),
    },
  ];

  // Format date for display
  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // User profile component for the header
  const UserProfile = () => (
    <Dropdown menu={userMenuItems} placement="bottomRight">
      <div style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '4px 8px 4px 4px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}
      >
        <Avatar
          icon={<UserOutlined />}
          src={user?.avatar}
          style={{
            marginRight: 12,
            background: 'linear-gradient(120deg, #1677ff, #0958d9)',
            boxShadow: '0 3px 10px rgba(22, 119, 255, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}
          size={38}
        />
        <div>
          <div style={{
            fontWeight: 500,
            color: '#fff',
            lineHeight: '1.2',
            fontSize: '14px'
          }}>
            {user?.name || 'Admin User'}
          </div>
          <div style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: '1.2'
          }}>
            {user?.role || 'Administrator'}
          </div>
        </div>
      </div>
    </Dropdown>
  );

  return (
    <ProLayout
      layout="mix"
      logo={
        <div style={{
          color: 'white',
          fontSize: collapsed ? '16px' : '20px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          padding: '6px 10px',      
        }}>
          <img
            src="/vite.svg"
            alt="Kido Logo"
            style={{
              marginRight: collapsed ? '0' : '10px',
              height: '28px',
              transition: 'all 0.2s',
              filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))'
            }}
          />
          {collapsed ? 'AI' : 'AI ADMIN'}
        </div>
      }
      title={false}
      fixedHeader={true}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      location={{
        pathname: location.pathname,
      }}
      menu={{
        type: 'group',
      }}
      route={{
        routes: menuItems,
      }}
      menuItemRender={(item, dom) => (
        <Link to={item.path}>{dom}</Link>
      )}
      
      // Header styles
      headerHeight={70}
      headerTheme="dark"
      headerStyle={{
        background: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
        boxShadow: '0 2px 12px rgba(0, 123, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
      
      // The central content in header (search bar)
      headerContentRender={() => (
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.15)', 
            borderRadius: '24px',
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '300px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <SearchOutlined style={{ color: 'rgba(255, 255, 255, 0.85)', marginRight: '8px' }} />
            <Input 
              placeholder="Tìm kiếm..." 
              bordered={false} 
              style={{ 
                background: 'transparent', 
                color: '#fff',
                width: '200px',
              }} 
              
            />
          </div>
          <div style={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Current date">
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.85)', 
                fontSize: '13px',
                padding: '4px 12px',
              }}>
                {formatDate()}
              </div>
            </Tooltip>
          </div>
        </div>
      )}
      
      // The right side of the header with action buttons
      actionsRender={() => [
        <Tooltip key="help" title="Help">
          <Button 
            type="text" 
            icon={<QuestionCircleOutlined style={{ color: '#fff' }} />} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }} 
          />
        </Tooltip>,
        
        <Tooltip key="apps" title="Apps">
          <Button 
            type="text" 
            icon={<AppstoreOutlined style={{ color: '#fff' }} />} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }} 
          />
        </Tooltip>,
        
        <Tooltip key="language" title="Language">
          <Button 
            type="text" 
            icon={<GlobalOutlined style={{ color: '#fff' }} />} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }} 
          />
        </Tooltip>,
        
        hasPermission(['admin']) && (
          <Tooltip key="admin" title="Admin access">
            <Badge dot color="#f5222d">
              <Button 
                type="text" 
                icon={<LockOutlined style={{ color: '#fff' }} />} 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }} 
              />
            </Badge>
          </Tooltip>
        ),
        
        <Tooltip key="notifications" title="Notifications">
          <Badge count={5} size="small">
            <Button 
              type="text" 
              icon={<BellOutlined style={{ color: '#fff' }} />} 
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }} 
            />
          </Badge>
        </Tooltip>,
        
        <Divider key="divider" type="vertical" style={{ 
          height: '24px', 
          borderColor: 'rgba(255, 255, 255, 0.15)' 
        }} />,
        
        <UserProfile key="user" />
      ]}
      
      contentStyle={{
        margin: '24px 16px',
        padding: 24,
        background: '#ffffff',
        borderRadius: 8,
        minHeight: '85vh',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        paddingTop: '64px',
      }}
    >
      {/* Add decorative elements to the header background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          background: 'radial-gradient(circle at 10% 50%, rgba(255, 255, 255, 0.12) 0%, transparent 45%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '64px',
          background: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      
      {children}
      <div style={{ 
        textAlign: 'center', 
        padding: '16px', 
        color: 'rgba(0,0,0,0.45)',
        fontSize: '13px',
        background: '#f0f2f5',
        borderRadius: '0 0 8px 8px',
        marginTop: '16px'
      }}>
        <div>Kido Admin ©{new Date().getFullYear()} Created by Kido Team</div>
        <div style={{ marginTop: '4px' }}>
          <a href="#" style={{ color: 'rgba(0,0,0,0.45)', marginRight: '16px' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'rgba(0,0,0,0.45)', marginRight: '16px' }}>Terms of Service</a>
          <a href="#" style={{ color: 'rgba(0,0,0,0.45)' }}>Contact Us</a>
        </div>
      </div>
    </ProLayout>
  );
};

export default MainLayout;
