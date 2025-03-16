import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-susi-gray-700"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
