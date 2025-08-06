import React, { useState } from 'react';
import { Button, message, Space, Tag, Popconfirm, Avatar, Typography, Badge } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UserOutlined,
  KeyOutlined,
  MailOutlined
} from '@ant-design/icons';
import { 
  ProTable, 
  ModalForm, 
  ProFormText, 
  ProFormSelect,
  ProFormSwitch
} from '@ant-design/pro-components';

const { Title, Paragraph } = Typography;

// Mock data for users
const MOCK_USERS = [
  { 
    id: 1, 
    name: 'John Doe', 
    username: 'johndoe',
    email: 'john.doe@example.com', 
    role: 'admin', 
    status: 'active',
    lastLogin: '2025-08-03 10:45:22',
    createdAt: '2025-01-15 08:12:45'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    username: 'janesmith',
    email: 'jane.smith@example.com', 
    role: 'manager', 
    status: 'active',
    lastLogin: '2025-08-05 14:22:10',
    createdAt: '2025-02-18 11:24:32'
  },
  { 
    id: 3, 
    name: 'Bob Johnson', 
    username: 'bjohnson',
    email: 'bob.johnson@example.com', 
    role: 'editor', 
    status: 'inactive',
    lastLogin: '2025-07-28 09:15:48',
    createdAt: '2025-03-22 15:40:19'
  },
  { 
    id: 4, 
    name: 'Alice Williams', 
    username: 'awilliams',
    email: 'alice.williams@example.com', 
    role: 'user', 
    status: 'active',
    lastLogin: '2025-08-04 16:30:05',
    createdAt: '2025-04-12 10:18:53'
  },
  { 
    id: 5, 
    name: 'Tom Brown', 
    username: 'tbrown',
    email: 'tom.brown@example.com', 
    role: 'editor', 
    status: 'active',
    lastLogin: '2025-08-01 08:55:33',
    createdAt: '2025-04-25 09:22:41'
  },
];

const Users = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [tableData, setTableData] = useState(MOCK_USERS);

  const handleAdd = async (fields) => {
    try {
      // In a real app, you would call an API here
      const newUser = {
        id: Date.now(),
        ...fields,
        createdAt: new Date().toLocaleString(),
        lastLogin: '-'
      };
      
      setTableData([...tableData, newUser]);
      message.success('User added successfully');
      return true;
    } catch (error) {
      message.error('Failed to add user');
      return false;
    }
  };

  const handleEdit = async (fields) => {
    try {
      // In a real app, you would call an API here
      const newData = [...tableData];
      const index = newData.findIndex(item => item.id === currentRow.id);
      if (index > -1) {
        newData[index] = { ...newData[index], ...fields };
        setTableData(newData);
        message.success('User updated successfully');
      }
      return true;
    } catch (error) {
      message.error('Failed to update user');
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      // In a real app, you would call an API here
      const newData = tableData.filter(item => item.id !== id);
      setTableData(newData);
      message.success('User deleted successfully');
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            icon={<UserOutlined />} 
            style={{ marginRight: 8, backgroundColor: record.role === 'admin' ? '#1677ff' : '#ccc' }} 
          />
          <div>
            <div>{record.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>@{record.username}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MailOutlined style={{ marginRight: 8, color: '#8c8c8c' }} />
          {email}
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Manager', value: 'manager' },
        { text: 'Editor', value: 'editor' },
        { text: 'User', value: 'user' },
      ],
      render: (role) => {
        let color = 'blue';
        if (role === 'admin') color = 'red';
        if (role === 'manager') color = 'orange';
        if (role === 'editor') color = 'green';
        if (role === 'user') color = 'default';
        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      render: (status) => (
        <Badge 
          status={status === 'active' ? 'success' : 'default'} 
          text={status.charAt(0).toUpperCase() + status.slice(1)} 
        />
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      sorter: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => {
              setCurrentRow(record);
              setEditModalVisible(true);
            }} 
          />
          <Popconfirm
            title="Delete this user?"
            description="This action cannot be undone"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>User Management</Title>
      <Paragraph type="secondary">Manage users and their permissions.</Paragraph>
      
      <ProTable
        headerTitle="Users"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => setCreateModalVisible(true)}
            icon={<PlusOutlined />}
          >
            Add User
          </Button>,
        ]}
        columns={columns}
        dataSource={tableData}
        pagination={{
          pageSize: 10,
        }}
      />
      
      <ModalForm
        title="Add User"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={setCreateModalVisible}
        onFinish={handleAdd}
      >
        <ProFormText
          name="name"
          label="Name"
          placeholder="Enter name"
          rules={[
            {
              required: true,
              message: 'Please enter user name!',
            },
          ]}
        />
        <ProFormText
          name="username"
          label="Username"
          placeholder="Enter username"
          rules={[
            {
              required: true,
              message: 'Please enter username!',
            },
          ]}
        />
        <ProFormText
          name="email"
          label="Email"
          placeholder="Enter email"
          rules={[
            {
              required: true,
              message: 'Please enter email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email!',
            },
          ]}
        />
        <ProFormSelect
          name="role"
          label="Role"
          valueEnum={{
            admin: 'Admin',
            manager: 'Manager',
            editor: 'Editor',
            user: 'User',
          }}
          placeholder="Select a role"
          rules={[
            {
              required: true,
              message: 'Please select a role!',
            },
          ]}
        />
        <ProFormSelect
          name="status"
          label="Status"
          valueEnum={{
            active: 'Active',
            inactive: 'Inactive',
          }}
          placeholder="Select status"
          rules={[
            {
              required: true,
              message: 'Please select status!',
            },
          ]}
        />
      </ModalForm>
      
      <ModalForm
        title="Edit User"
        width="400px"
        visible={editModalVisible}
        onVisibleChange={setEditModalVisible}
        onFinish={handleEdit}
        initialValues={currentRow}
      >
        <ProFormText
          name="name"
          label="Name"
          placeholder="Enter name"
          rules={[
            {
              required: true,
              message: 'Please enter user name!',
            },
          ]}
        />
        <ProFormText
          name="username"
          label="Username"
          placeholder="Enter username"
          rules={[
            {
              required: true,
              message: 'Please enter username!',
            },
          ]}
        />
        <ProFormText
          name="email"
          label="Email"
          placeholder="Enter email"
          rules={[
            {
              required: true,
              message: 'Please enter email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email!',
            },
          ]}
        />
        <ProFormSelect
          name="role"
          label="Role"
          valueEnum={{
            admin: 'Admin',
            manager: 'Manager',
            editor: 'Editor',
            user: 'User',
          }}
          placeholder="Select a role"
          rules={[
            {
              required: true,
              message: 'Please select a role!',
            },
          ]}
        />
        <ProFormSelect
          name="status"
          label="Status"
          valueEnum={{
            active: 'Active',
            inactive: 'Inactive',
          }}
          placeholder="Select status"
          rules={[
            {
              required: true,
              message: 'Please select status!',
            },
          ]}
        />
      </ModalForm>
    </div>
  );
};

export default Users;