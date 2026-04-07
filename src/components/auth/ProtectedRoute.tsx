import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store';

type Props = { children: ReactNode };

export function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/oauth/login" state={{ from: location }} replace />;
  }

  return children;
}
