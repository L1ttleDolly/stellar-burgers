import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder } from '../../services/thunks/createOrder';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { clearOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useSelector(
    (state) => state.constructorSlice.constructorItems
  );
  const user = useSelector((state) => state.user.user);
  const constructorItems = { bun, ingredients };

  const orderRequest = useSelector((state) => state.order.isLoading);
  const orderModalData = useSelector((state) => state.order?.order);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const order: string[] = [bun!._id, ...ingredients.map((e) => e._id)];

    if (user === null) {
      return navigate('/login', { state: { from: location.pathname } });
    } else {
      dispatch(createOrder(order));
    }
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor(constructorItems));
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
