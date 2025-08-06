import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  message, 
  Checkbox,
  Layout,
  Space
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  LoginOutlined 
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect URL from query params
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleLogin = async (values) => {
    setLoading(true);
    
    try {
      // Call the login function from our auth context
      const result = await login({
        username: values.username,
        password: values.password,
      });
      
      if (result.success) {
        message.success('Login successful!');
        navigate(redirectPath, { replace: true });
      } else {
        message.error(result.message || 'Invalid username or password!');
      }
    } catch (error) {
      message.error('Login failed: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card 
          style={{ 
            width: 400, 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '8px' 
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Space direction="vertical" size={16}>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: '#1890ff'
              }}>
                KIDO ADMIN
              </div>
              <Title level={3}>Sign In</Title>
            </Space>
          </div>
          
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="Username" 
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
              />
            </Form.Item>
            
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a style={{ float: 'right' }} href="#forgot">
                Forgot password?
              </a>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<LoginOutlined />}
                style={{ width: '100%' }}
              >
                Sign in
              </Button>
            </Form.Item>
            
            <div style={{ textAlign: 'center' }}>
              <small style={{ color: 'rgba(0,0,0,.45)' }}>
                Demo credentials: admin / password
              </small>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;