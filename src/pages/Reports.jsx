import React from 'react';
import { 
  Card, 
  Breadcrumb, 
  Tabs, 
  Table, 
  Button, 
  Space, 
  DatePicker, 
  Statistic, 
  Row, 
  Col,
  Select
} from 'antd';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined, 
  DownloadOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined
} from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;

// Sample data for sales report
const salesData = [
  {
    key: '1',
    date: '2025-08-01',
    revenue: 12580.45,
    orders: 156,
    customers: 142,
  },
  {
    key: '2',
    date: '2025-08-02',
    revenue: 9870.50,
    orders: 124,
    customers: 118,
  },
  {
    key: '3',
    date: '2025-08-03',
    revenue: 8450.20,
    orders: 98,
    customers: 92,
  },
  {
    key: '4',
    date: '2025-08-04',
    revenue: 14250.75,
    orders: 167,
    customers: 153,
  },
  {
    key: '5',
    date: '2025-08-05',
    revenue: 11340.30,
    orders: 132,
    customers: 121,
  },
];

const salesColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'revenue',
    render: (revenue) => `$${revenue.toFixed(2)}`,
  },
  {
    title: 'Orders',
    dataIndex: 'orders',
    key: 'orders',
  },
  {
    title: 'Customers',
    dataIndex: 'customers',
    key: 'customers',
  },
];

// Sample data for inventory report
const inventoryData = [
  {
    key: '1',
    category: 'Electronics',
    inStock: 156,
    outOfStock: 12,
    lowStock: 28,
    value: 45892.45,
  },
  {
    key: '2',
    category: 'Furniture',
    inStock: 87,
    outOfStock: 3,
    lowStock: 14,
    value: 32450.99,
  },
  {
    key: '3',
    category: 'Clothing',
    inStock: 215,
    outOfStock: 8,
    lowStock: 32,
    value: 28760.50,
  },
  {
    key: '4',
    category: 'Books',
    inStock: 189,
    outOfStock: 5,
    lowStock: 17,
    value: 12340.25,
  },
];

const inventoryColumns = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'In Stock',
    dataIndex: 'inStock',
    key: 'inStock',
  },
  {
    title: 'Out of Stock',
    dataIndex: 'outOfStock',
    key: 'outOfStock',
  },
  {
    title: 'Low Stock',
    dataIndex: 'lowStock',
    key: 'lowStock',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: (value) => `$${value.toFixed(2)}`,
  },
];

const Reports = () => {
  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: 'Home' },
          { title: 'Reports' },
        ]}
      />
      
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Revenue (August)"
              value={56492.20}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="USD"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Orders Growth"
              value={12.3}
              precision={1}
              valueStyle={{ color: '#3f8600' }}
              prefix={<RiseOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Returns Rate"
              value={3.2}
              precision={1}
              valueStyle={{ color: '#cf1322' }}
              prefix={<FallOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Card title="Reports" 
        extra={
          <Space>
            <RangePicker />
            <Select defaultValue="daily" style={{ width: 120 }}>
              <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
            </Select>
            <Button type="primary" icon={<DownloadOutlined />}>
              Export
            </Button>
          </Space>
        }
      >
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={<span><BarChartOutlined /> Sales Report</span>}
            key="1"
          >
            <Table 
              columns={salesColumns} 
              dataSource={salesData} 
              pagination={false}
              summary={() => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}><strong>Total</strong></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <strong>${salesData.reduce((sum, item) => sum + item.revenue, 0).toFixed(2)}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <strong>{salesData.reduce((sum, item) => sum + item.orders, 0)}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <strong>{salesData.reduce((sum, item) => sum + item.customers, 0)}</strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </TabPane>
          <TabPane 
            tab={<span><PieChartOutlined /> Inventory Report</span>}
            key="2"
          >
            <Table 
              columns={inventoryColumns} 
              dataSource={inventoryData} 
              pagination={false}
              summary={() => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}><strong>Total</strong></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <strong>{inventoryData.reduce((sum, item) => sum + item.inStock, 0)}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <strong>{inventoryData.reduce((sum, item) => sum + item.outOfStock, 0)}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <strong>{inventoryData.reduce((sum, item) => sum + item.lowStock, 0)}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                      <strong>${inventoryData.reduce((sum, item) => sum + item.value, 0).toFixed(2)}</strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </TabPane>
          <TabPane 
            tab={<span><LineChartOutlined /> Performance</span>}
            key="3"
          >
            <div style={{ padding: '20px 0', textAlign: 'center' }}>
              <h3>Performance analysis charts would be displayed here</h3>
              <p>This section would typically include interactive charts showing performance metrics over time.</p>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Reports;