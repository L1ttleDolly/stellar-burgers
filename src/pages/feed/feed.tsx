import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/thunks/fetchFeeds';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const feeds = useSelector((state) => state.feeds.feedsArr);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  const orders: TOrder[] = feeds.orders;

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetFeeds();
      }}
    />
  );
};
