import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  redirectPath?: string;
}

/**
 * A wrapper for routes that should only be accessible to authenticated users.
 * If the user is not authenticated, they will be redirected to the specified path.
 */
export default function ProtectedRoute({ redirectPath = '/auth' }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  // Show loading indicator while checking authentication status
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-light z-50">
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-lg text-neutral font-medium">Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
}
