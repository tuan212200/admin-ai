import React from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Card, 
  Input, 
  Image, 
  Tag, 
  Breadcrumb,
  Statistic,
  Row,
  Col
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  DollarOutlined, 
  ShoppingOutlined, 
  TagOutlined
} from '@ant-design/icons';

// Sample product data
const productData = [
  {
    key: '1',
    name: 'Premium Headphones',
    price: 299.99,
    category: 'Electronics',
    stock: 24,
    status: 'In Stock',
    image: 'https://placehold.co/60x60',
  },
  {
    key: '2',
    name: 'Ergonomic Chair',
    price: 199.99,
    category: 'Furniture',
    stock: 15,
    status: 'In Stock',
    image: 'https://placehold.co/60x60',
  },
  {
    key: '3',
    name: 'Smartphone X',
    price: 899.99,
    category: 'Electronics',
    stock: 0,
    status: 'Out of Stock',
    image: 'https://placehold.co/60x60',
  },
  {
    key: '4',
    name: 'Designer Lamp',
    price: 149.99,
    category: 'Home Decor',
    stock: 8,
    status: 'Low Stock',
    image: 'https://placehold.co/60x60',
  },
  {
    key: '5',
    name: 'Bluetooth Speaker',
    price: 79.99,
    category: 'Electronics',
    stock: 32,
    status: 'In Stock',
    image: 'https://placehold.co/60x60',
  },
];

const columns = [
  {
    title: 'Product',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Space>
        <Image src={record.image} width={40} height={40} preview={false} style={{ borderRadius: '4px' }} />
        {text}
      </Space>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price) => `$${price.toFixed(2)}`,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = 'green';
      if (status === 'Out of Stock') color = 'red';
      if (status === 'Low Stock') color = 'orange';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>View</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const Products = () => {
  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: 'Home' },
          { title: 'Products' },
        ]}
      />
      
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Products"
              value={productData.length}
              prefix={<TagOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Value"
              value={productData.reduce((sum, product) => sum + product.price * product.stock, 0).toFixed(2)}
              prefix={<DollarOutlined />}
              suffix="USD"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Out of Stock"
              value={productData.filter(product => product.status === 'Out of Stock').length}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card title="Products Management" 
        extra={
          <Space>
            <Input 
              placeholder="Search products" 
              prefix={<SearchOutlined />} 
              style={{ width: 200 }}
            />
            <Button type="primary" icon={<PlusOutlined />}>
              Add Product
            </Button>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={productData} 
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Products;