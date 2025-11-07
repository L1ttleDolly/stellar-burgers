import {
  addItem,
  clearConstructor,
  constructorSlice,
  deleteItem,
  updateIngredientsPosition
} from '../services/slices/constructorSlice';

describe('Тестирование reducers слайса constructorSlice', function () {
  const initialState = {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0
      }
    ],
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };

  test('Добавление ингредиента в конструктор', () => {
    const stateWithIngredient = constructorSlice.reducer(
      initialState,
      addItem(initialState.ingredients[1])
    );

    const { constructorItems } = stateWithIngredient;

    expect(constructorItems.ingredients).toEqual([
      {
        ...initialState.ingredients[1],
        id: expect.any(String)
      }
    ]);

    expect(constructorItems.bun).toBeNull();
  });
  test('Удаление ингредиента из конструктора', () => {
    const stateWithIngredient = constructorSlice.reducer(
      initialState,
      addItem(initialState.ingredients[1])
    );

    const ingredientId = stateWithIngredient.constructorItems.ingredients[0].id;

    const stateWithoutIngredient = constructorSlice.reducer(
      initialState,
      deleteItem(ingredientId)
    );

    const { constructorItems } = stateWithoutIngredient;

    expect(constructorItems.ingredients).toEqual([]);
    expect(constructorItems.bun).toBeNull();
  });
  test('Изменения порядка ингредиента в конструкторе', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            __v: 0
          }
        ]
      }
    };

    const newPosition = [
      stateWithIngredient.constructorItems.ingredients[1],
      stateWithIngredient.constructorItems.ingredients[0],
      stateWithIngredient.constructorItems.ingredients[2]
    ];

    const stateNewIngredientPosition = constructorSlice.reducer(
      initialState,
      updateIngredientsPosition(newPosition)
    );

    expect(stateNewIngredientPosition.constructorItems.ingredients).toEqual(
      newPosition
    );
  });
  test('Очищение конструктора ', () => {
    const stateWithIngredient = constructorSlice.reducer(
      initialState,
      addItem(initialState.ingredients[1])
    );

    const clear = constructorSlice.reducer(
      stateWithIngredient,
      clearConstructor(true)
    );

    expect(clear.constructorItems.ingredients).toEqual([]);
    expect(clear.constructorItems.bun).toBeNull();
  });
});
