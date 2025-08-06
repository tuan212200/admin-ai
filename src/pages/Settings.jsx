import React, { useEffect } from 'react';
import { 
  Card, 
  Breadcrumb, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  Upload, 
  Divider,
  Space,
  Radio,
  Typography,
  message
} from 'antd';
import { 
  SaveOutlined, 
  UploadOutlined, 
  UserOutlined, 
  LockOutlined,
  MailOutlined,
  BellOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { TabPane } = Tabs;
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Settings = () => {
  const [profileForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationsForm] = Form.useForm();
  const [systemForm] = Form.useForm();
  
  const { user } = useAuth();
  
  // Load saved settings from localStorage on component mount
  useEffect(() => {
    // Profile settings
    const savedProfile = localStorage.getItem('kidoAdminProfile');
    if (savedProfile) {
      profileForm.setFieldsValue(JSON.parse(savedProfile));
    } else if (user) {
      // If no saved profile but user is logged in, use user data
      profileForm.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
    
    // Security settings
    const savedSecurity = localStorage.getItem('kidoAdminSecurity');
    if (savedSecurity) {
      securityForm.setFieldsValue(JSON.parse(savedSecurity));
    }
    
    // Notifications settings
    const savedNotifications = localStorage.getItem('kidoAdminNotifications');
    if (savedNotifications) {
      notificationsForm.setFieldsValue(JSON.parse(savedNotifications));
    }
    
    // System settings
    const savedSystem = localStorage.getItem('kidoAdminSystem');
    if (savedSystem) {
      systemForm.setFieldsValue(JSON.parse(savedSystem));
    }
  }, [profileForm, securityForm, notificationsForm, systemForm, user]);

  const saveProfile = (values) => {
    localStorage.setItem('kidoAdminProfile', JSON.stringify(values));
    message.success('Profile settings saved successfully!');
  };

  const saveSecurity = (values) => {
    // Remove passwords before saving to localStorage for security
    const securitySettings = {
      twoFactor: values.twoFactor,
      sessionTimeout: values.sessionTimeout
    };
    localStorage.setItem('kidoAdminSecurity', JSON.stringify(securitySettings));
    message.success('Security settings saved successfully!');
  };

  const saveNotifications = (values) => {
    localStorage.setItem('kidoAdminNotifications', JSON.stringify(values));
    message.success('Notification settings saved successfully!');
  };

  const saveSystem = (values) => {
    localStorage.setItem('kidoAdminSystem', JSON.stringify(values));
    message.success('System settings saved successfully!');
    
    // Apply theme if changed
    if (values.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: 'Home' },
          { title: 'Settings' },
        ]}
      />
      
      <Card title="Settings">
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={<span><UserOutlined /> Profile</span>}
            key="1"
          >
            <Form
              form={profileForm}
              layout="vertical"
              initialValues={{
                name: 'Admin User',
                email: 'admin@kido.com',
                role: 'administrator',
                bio: 'System administrator for Kido Admin',
              }}
              onFinish={saveProfile}
            >
              <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <Title level={4}>Personal Information</Title>
                <Form.Item
                  name="avatar"
                  label="Profile Picture"
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    maxCount={1}
                    showUploadList={true}
                    beforeUpload={(file) => {
                      // Simulate upload - prevent actual upload
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
                
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: 'Please enter your name' },
                    { min: 3, message: 'Name must be at least 3 characters' }
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Enter your name" />
                </Form.Item>
                
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                </Form.Item>
                
                <Form.Item
                  name="role"
                  label="Role"
                >
                  <Select>
                    <Option value="administrator">Administrator</Option>
                    <Option value="editor">Editor</Option>
                    <Option value="viewer">Viewer</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="bio"
                  label="Bio"
                  rules={[
                    { max: 200, message: 'Bio cannot be longer than 200 characters' }
                  ]}
                >
                  <TextArea rows={4} placeholder="Tell something about yourself" />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Save Profile
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={<span><LockOutlined /> Security</span>}
            key="2"
          >
            <Form
              form={securityForm}
              layout="vertical"
              initialValues={{
                twoFactor: true,
                sessionTimeout: '30',
              }}
              onFinish={saveSecurity}
            >
              <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <Title level={4}>Password</Title>
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[{ required: true, message: 'Please enter your current password' }]}
                >
                  <Input.Password placeholder="Enter current password" />
                </Form.Item>
                
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    { required: true, message: 'Please enter new password' },
                    { 
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
                    }
                  ]}
                >
                  <Input.Password placeholder="Enter new password" />
                </Form.Item>
                
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm new password" />
                </Form.Item>
                
                <Divider />
                
                <Title level={4}>Security Settings</Title>
                <Form.Item
                  name="twoFactor"
                  label="Two-Factor Authentication"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="sessionTimeout"
                  label="Session Timeout (minutes)"
                >
                  <Select>
                    <Option value="15">15 minutes</Option>
                    <Option value="30">30 minutes</Option>
                    <Option value="60">1 hour</Option>
                    <Option value="120">2 hours</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Save Security Settings
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={<span><BellOutlined /> Notifications</span>}
            key="3"
          >
            <Form
              form={notificationsForm}
              layout="vertical"
              initialValues={{
                emailNotifications: true,
                orderAlerts: true,
                stockAlerts: true,
                newsletter: false,
              }}
              onFinish={saveNotifications}
            >
              <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <Title level={4}>Notification Preferences</Title>
                
                <Form.Item
                  name="emailNotifications"
                  label="Email Notifications"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="orderAlerts"
                  label="Order Alerts"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="stockAlerts"
                  label="Low Stock Alerts"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="newsletter"
                  label="Newsletter"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Save Notification Settings
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={<span><GlobalOutlined /> System</span>}
            key="4"
          >
            <Form
              form={systemForm}
              layout="vertical"
              initialValues={{
                language: 'english',
                timezone: 'UTC+0',
                dateFormat: 'MM/DD/YYYY',
                theme: 'light',
              }}
              onFinish={saveSystem}
            >
              <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <Title level={4}>System Settings</Title>
                
                <Form.Item
                  name="language"
                  label="Language"
                >
                  <Select>
                    <Option value="english">English</Option>
                    <Option value="spanish">Spanish</Option>
                    <Option value="french">French</Option>
                    <Option value="german">German</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="timezone"
                  label="Timezone"
                >
                  <Select>
                    <Option value="UTC-8">Pacific Time (UTC-8)</Option>
                    <Option value="UTC-5">Eastern Time (UTC-5)</Option>
                    <Option value="UTC+0">Greenwich Mean Time (UTC+0)</Option>
                    <Option value="UTC+1">Central European Time (UTC+1)</Option>
                    <Option value="UTC+8">China Standard Time (UTC+8)</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="dateFormat"
                  label="Date Format"
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="MM/DD/YYYY">MM/DD/YYYY</Radio>
                      <Radio value="DD/MM/YYYY">DD/MM/YYYY</Radio>
                      <Radio value="YYYY-MM-DD">YYYY-MM-DD</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                
                <Form.Item
                  name="theme"
                  label="Theme"
                >
                  <Radio.Group>
                    <Radio value="light">Light</Radio>
                    <Radio value="dark">Dark</Radio>
                    <Radio value="system">System Default</Radio>
                  </Radio.Group>
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                    Save System Settings
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;