import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '@/services/login';
import { queryCurrent } from '@/services/user';
import { setAuthority } from '@/utils/authority';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on initial render
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const response = await queryCurrent();
        const userData = response?.data;
        
        if (userData) {
          setUser({
            ...userData,
            id: userData?.userid,
            isPasswordDefault: userData?.isPasswordDefault,
            name: userData?.name,
            role: userData?.role,
          });
          
          // Set authority based on user role
          setAuthority(userData?.role || []);
        }
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await loginService(credentials);
      
      if (response?.data) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Fetch user details
        await fetchUserDetails();
        return { success: true };
      }
      
      return { success: false, message: response?.message || 'Login failed' };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await queryCurrent();
      const userData = response?.data;
      
      if (userData) {
        setUser({
          ...userData,
          id: userData?.userid,
          isPasswordDefault: userData?.isPasswordDefault,
          name: userData?.name,
          role: userData?.role,
        });
        
        // Set authority based on user role
        setAuthority(userData?.role || []);
      }
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutService();
      // Clear user data and token
      localStorage.removeItem('token');
      setUser(null);
      setAuthority([]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  // Check if user has specific permission
  const hasPermission = (requiredPermission) => {
    if (!user || !user.role) return false;
    
    const userAuthority = Array.isArray(user.role) ? user.role : [user.role];
    
    if (Array.isArray(requiredPermission)) {
      return requiredPermission.some(permission => userAuthority.includes(permission));
    }
    
    return userAuthority.includes(requiredPermission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        hasPermission,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;