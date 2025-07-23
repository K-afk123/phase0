import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/appStore';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CustomerPage from './pages/CustomerPage';
import ProductPage from './pages/ProductPage';
import CompanyPage from './pages/CompanyPage';

function App() {
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!currentUser ? <LoginPage /> : <Navigate to="/" />} 
      />
      <Route 
        path="/" 
        element={currentUser ? <DashboardPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/customers" 
        element={currentUser ? <CustomerPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/products" 
        element={currentUser ? <ProductPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/company" 
        element={currentUser ? <CompanyPage /> : <Navigate to="/login" />} 
      />
    </Routes>
  )
}

export default App
