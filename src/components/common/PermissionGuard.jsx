import React from 'react';
import { usePermission } from '@/hooks/usePermission';

/**
 * Component that conditionally renders children based on user permissions
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child components to render if authorized
 * @param {string|string[]} props.permissions - Required permissions to display the children
 * @param {React.ReactNode} props.fallback - Component to display if not authorized (default: null)
 * @returns {React.ReactNode} - The children or fallback component
 */
const PermissionGuard = ({ 
  children, 
  permissions = [], 
  fallback = null 
}) => {
  const hasPermission = usePermission(permissions);
  
  if (!permissions || permissions.length === 0) {
    return children;
  }
  
  return hasPermission ? children : fallback;
};

export default PermissionGuard;