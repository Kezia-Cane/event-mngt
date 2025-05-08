import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;