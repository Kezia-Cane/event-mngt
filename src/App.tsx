import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RegisterForm from './components/auth/RegisterForm';
import { AuthProvider } from './context/AuthContext';

// Placeholder components (to be implemented later)
const Home = () => <div>Home Page</div>;
const Dashboard = () => <div>User Dashboard</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Protected routes for all authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Protected routes for admin users */}
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
