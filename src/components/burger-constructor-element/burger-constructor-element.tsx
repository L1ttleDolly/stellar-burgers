import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  deleteItem,
  updateIngredientsPosition
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const ingredients = useSelector(
      (state) => state.constructorSlice.constructorItems.ingredients
    );

    const handleMoveDown = () => {
      const currentIndex = ingredients.findIndex(
        (ing) => ing.id === ingredient.id
      );

      const newIngredients = [...ingredients];

      [newIngredients[currentIndex + 1], newIngredients[currentIndex]] = [
        newIngredients[currentIndex],
        newIngredients[currentIndex + 1]
      ];

      dispatch(updateIngredientsPosition(newIngredients));
    };

    const handleMoveUp = () => {
      const currentIndex = ingredients.findIndex(
        (ing) => ing.id === ingredient.id
      );

      const newIngredients = [...ingredients];

      [newIngredients[currentIndex - 1], newIngredients[currentIndex]] = [
        newIngredients[currentIndex],
        newIngredients[currentIndex - 1]
      ];

      dispatch(updateIngredientsPosition(newIngredients));
    };

    const handleClose = () => {
      dispatch(deleteItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
