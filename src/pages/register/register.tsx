import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchRegisterUser } from '../../services/thunks/fetchRegisterUser';
import { useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';
  const userErrorText = useSelector((state) => state.user.error);
  const isLoading = useSelector((state) => state.user.isLoading);

  const data = {
    email: email,
    name: userName,
    password: password
  };

  if (isLoading === true) {
    return <Preloader />;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser(data))
      .unwrap()
      .then(() => navigate(from, { replace: true }))
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <RegisterUI
      errorText={userErrorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
