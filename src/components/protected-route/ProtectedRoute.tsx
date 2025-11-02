import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { PrivateRoute } from '../../utils/routes';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isPublic?: boolean;
};

export const ProtectedRoute = ({ children, isPublic }: ProtectedRouteProps) => {
  const userCheck = useSelector((state) => state.user.userCheck);
  const user = useSelector((state) => state.user.user);

  const location = useLocation();

  if (!userCheck) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from || {
      pathname: PrivateRoute.ProfileRoute
    };
    return <Navigate replace to={from} />;
  }

  if (!isPublic && !user) {
    return (
      <Navigate
        replace
        to={PrivateRoute.LoginRoute}
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};
