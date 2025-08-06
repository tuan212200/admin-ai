import React from 'react';
import { Typography, Breadcrumb, Space, Button } from 'antd';

const { Title } = Typography;

/**
 * Reusable PageHeader component for all admin pages
 * @param {string} title - The page title
 * @param {Array} breadcrumbItems - Array of breadcrumb items
 * @param {React.ReactNode} extra - Extra content to display on the right side
 * @param {React.ReactNode} children - Optional subtitle or description
 */
const PageHeader = ({ title, breadcrumbItems = [], extra, children }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <Breadcrumb 
        style={{ marginBottom: 16 }}
        items={breadcrumbItems}
      />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: children ? 16 : 0 
      }}>
        <Title level={2} style={{ margin: 0 }}>{title}</Title>
        {extra && <div>{extra}</div>}
      </div>
      
      {children && <div>{children}</div>}
    </div>
  );
};

export default PageHeader;