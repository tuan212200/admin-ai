import { useAuth } from '@/context/AuthContext';
import { getAuthority } from '@/utils/authority';

/**
 * Custom hook to check if the current user has the required permissions
 * @param {string|string[]} requiredPermissions - Permission or array of permissions to check
 * @returns {boolean} - Whether the user has the required permissions
 */
export function usePermission(requiredPermissions) {
  const { user, hasPermission } = useAuth();
  
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }
  
  // If context-based auth is available, use it
  if (hasPermission) {
    return hasPermission(requiredPermissions);
  }
  
  // Fallback to localStorage-based authority check
  const currentAuthority = getAuthority();
  
  if (!currentAuthority || currentAuthority.length === 0) {
    return false;
  }
  
  // Check if user has any of the required permissions
  if (Array.isArray(requiredPermissions)) {
    return requiredPermissions.some(permission => 
      currentAuthority.includes(permission)
    );
  }
  
  // Check for a single permission
  return currentAuthority.includes(requiredPermissions);
}