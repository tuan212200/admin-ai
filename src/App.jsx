import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from 'antd';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Conversations from './pages/conversations';
import { useAuth } from './context/AuthContext';
import './App.css';

// Custom theme configuration
const customTheme = {
  token: {
    colorPrimary: '#1677ff',
    colorLink: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    borderRadius: 6,
    wireframe: false,
    // Font
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
  },
  components: {
    Card: {
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
    },
    Button: {
      primaryShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
    }
  }
};

function AppRoutes() {
  const { user, login } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={!user ? <Login onLogin={login} /> : <Navigate to="/" replace />} />
      
      {/* Main Routes */}
      <Route path="/" element={
        <MainLayout>
          <Dashboard />
        </MainLayout>
      } />

      <Route path="/conversations" element={
        <MainLayout>
          <Conversations />
        </MainLayout>
      } />
      
      <Route path="/users" element={
        <MainLayout>
          <Users />
        </MainLayout>
      } />
      
      <Route path="/products" element={
        <MainLayout>
          <Products />
        </MainLayout>
      } />
      
      <Route path="/reports" element={
        <MainLayout>
          <Reports />
        </MainLayout>
      } />
      
      <Route path="/settings" element={
        <MainLayout>
          <Settings />
        </MainLayout>
      } />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
