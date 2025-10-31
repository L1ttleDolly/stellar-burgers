import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchLoginUser } from '../../services/thunks/fetchLoginUser';
import { useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { AbsoluteAppRoute } from '../../utils/routes';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || { pathname: AbsoluteAppRoute.Root };
  const isLoading = useSelector((state) => state.user.isLoading);
  const userErrorText = useSelector((state) => state.user.error);

  const userData = {
    email,
    password
  };

  if (isLoading === true) {
    return <Preloader />;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser(userData))
      .unwrap()
      .then(() => navigate(from, { replace: true }))
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <LoginUI
      errorText={userErrorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
