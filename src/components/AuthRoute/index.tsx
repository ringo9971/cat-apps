import { ReactElement } from 'react';

import { User } from 'firebase/auth';
import { useUser } from 'hooks/firebase/useUser';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthRouteProps {
  children: (user: User) => ReactElement;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <></>;
  }

  if (user == null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children(user);
};

export default AuthRoute;
