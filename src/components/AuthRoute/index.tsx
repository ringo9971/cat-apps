import { useUser } from 'hooks/firebase/useUser';
import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthRouteProps {
  element: ReactElement;
}

const AuthRoute = ({ element }: AuthRouteProps) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <></>;
  }

  if (user == null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default AuthRoute;
