import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/thunks/fetchUserOrders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const userOrders = useSelector((state) => state.feeds.userOrders);
  const orders: TOrder[] = userOrders;

  return <ProfileOrdersUI orders={orders} />;
};
