import { type ReactElement } from 'react';
import { Navigate } from 'react-router';
import useAuthStore from '@/store/auth-store';
import { APP_ROUTES } from '.';

interface Props {
  children: ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuthStore((state) => state);

  return isAuthenticated ? <Navigate to={APP_ROUTES.CHAT} /> : children;
};

export default PublicRoute;
