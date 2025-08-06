import React from 'react';
import { Card, Row, Col, Statistic, Table, Typography, Progress, Tag } from 'antd';
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  DollarOutlined, 
  FileOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { 
  ProCard, 
  StatisticCard, 
  ProTable,
  ProList 
} from '@ant-design/pro-components';

const { Title, Paragraph } = Typography;

// Mock data for dashboard
const salesData = [
  { month: 'Jan', sales: 38 },
  { month: 'Feb', sales: 52 },
  { month: 'Mar', sales: 61 },
  { month: 'Apr', sales: 45 },
  { month: 'May', sales: 48 },
  { month: 'Jun', sales: 65 }
];

const recentOrders = [
  { id: '1', customer: 'John Doe', product: 'Premium Package', amount: 199.99, status: 'success' },
  { id: '2', customer: 'Jane Smith', product: 'Basic Subscription', amount: 49.99, status: 'processing' },
  { id: '3', customer: 'Bob Johnson', product: 'Enterprise Solution', amount: 599.99, status: 'success' },
  { id: '4', customer: 'Alice Williams', product: 'Standard Package', amount: 99.99, status: 'pending' },
  { id: '5', customer: 'Tom Brown', product: 'Premium Package', amount: 199.99, status: 'error' },
];

const columns = [
  {
    title: 'Order ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => `$${amount}`,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = 'blue';
      if (status === 'success') color = 'green';
      if (status === 'error') color = 'red';
      if (status === 'pending') color = 'orange';
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
];

const popularProducts = [
  { id: 1, title: 'Premium Package', sold: 1245, stock: 200 },
  { id: 2, title: 'Basic Subscription', sold: 2410, stock: 'Unlimited' },
  { id: 3, title: 'Enterprise Solution', sold: 467, stock: 150 },
  { id: 4, title: 'Standard Package', sold: 978, stock: 350 },
];

const Dashboard = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Paragraph type="secondary">Welcome to your admin dashboard.</Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <StatisticCard
              statistic={{
                title: 'Total Users',
                value: 1128,
                icon: <UserOutlined />,
                description: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowUpOutlined style={{ color: '#52c41a' }} />
                    <span style={{ color: '#52c41a' }}>16% increase</span>
                  </div>
                ),
              }}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <StatisticCard
              statistic={{
                title: 'Products',
                value: 93,
                icon: <ShoppingCartOutlined />,
                description: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowUpOutlined style={{ color: '#52c41a' }} />
                    <span style={{ color: '#52c41a' }}>4% increase</span>
                  </div>
                ),
              }}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <StatisticCard
              statistic={{
                title: 'Revenue',
                value: '$12,846',
                icon: <DollarOutlined />,
                description: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowUpOutlined style={{ color: '#52c41a' }} />
                    <span style={{ color: '#52c41a' }}>12% increase</span>
                  </div>
                ),
              }}
            />
          </ProCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <ProCard>
            <StatisticCard
              statistic={{
                title: 'Orders',
                value: 149,
                icon: <FileOutlined />,
                description: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowDownOutlined style={{ color: '#ff4d4f' }} />
                    <span style={{ color: '#ff4d4f' }}>2% decrease</span>
                  </div>
                ),
              }}
            />
          </ProCard>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <ProCard title="Recent Orders" extra={<a href="#">View All</a>}>
            <ProTable
              columns={columns}
              dataSource={recentOrders}
              search={false}
              pagination={false}
              options={false}
              dateFormatter="string"
              headerTitle={false}
            />
          </ProCard>
        </Col>
        <Col xs={24} lg={8}>
          <ProCard title="Popular Products" extra={<a href="#">More</a>}>
            <ProList
              itemLayout="horizontal"
              dataSource={popularProducts}
              renderItem={(item) => (
                <ProList.Item
                  extra={
                    typeof item.stock === 'number' ? (
                      <div style={{ width: 120 }}>
                        <Progress percent={Math.floor((item.stock / 500) * 100)} size="small" />
                        <div>Stock: {item.stock}</div>
                      </div>
                    ) : (
                      <Tag color="green">Unlimited</Tag>
                    )
                  }
                >
                  <ProList.Item.Meta
                    title={item.title}
                    description={`Sold: ${item.sold} units`}
                  />
                </ProList.Item>
              )}
            />
          </ProCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;