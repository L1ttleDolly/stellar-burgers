import {
  ConstructorPage,
  Feed,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/thunks/fetchIngredients';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { fetchFeeds } from '../../services/thunks/fetchFeeds';
import { getUser } from '../../services/thunks/getUserApi';
import { setUserCheck } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';
import { AbsoluteAppRoute } from '../../utils/routes';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const backgroundLocation = location.state?.backgroundLocation;
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      dispatch(getUser());
    } else {
      dispatch(setUserCheck(true));
    }
    dispatch(fetchIngredients());
  }, [dispatch]);

  console.log('getUser', user);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path={AbsoluteAppRoute.Root} element={<ConstructorPage />} />
        <Route path={AbsoluteAppRoute.Feed} element={<Feed />} />

        <Route
          path={AbsoluteAppRoute.Profile}
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path='orders' element={<ProfileOrders />} />
          <Route path='orders/:number' element={<OrderInfo />} />
        </Route>

        <Route
          path={AbsoluteAppRoute.Login}
          element={
            <ProtectedRoute isPublic>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={AbsoluteAppRoute.Register}
          element={
            <ProtectedRoute isPublic>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={AbsoluteAppRoute.ForgotPassword}
          element={
            <ProtectedRoute isPublic>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path={AbsoluteAppRoute.NotFound404} element={<NotFound404 />} />

        <Route
          path={AbsoluteAppRoute.IngredientsId}
          element={<IngredientDetails />}
        />
        <Route path={AbsoluteAppRoute.FeedNumber} element={<OrderInfo />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path={AbsoluteAppRoute.IngredientsId}
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path={AbsoluteAppRoute.FeedNumber}
            element={
              <Modal title={'Детали заказа'} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path={AbsoluteAppRoute.ProfileOrdersNumber}
            element={
              <ProtectedRoute>
                <Modal title={'Детали заказа'} onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
