import { TIngredient } from '@utils-types';

describe('Тестирование бургер конструктора', function () {
  beforeEach('Получение ингредиентов', function () {
    cy.fixture('ingredients').then((ing: TIngredient) => {
      cy.intercept(
        'GET',
        'https://norma.education-services.ru/api/ingredients',
        {
          statusCode: 200,
          delay: 800,
          body: ing
        }
      ).as('getIng');
    });
    cy.intercept('GET', 'https://norma.education-services.ru/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('POST', 'https://norma.education-services.ru/api/orders', {
      fixture: 'createOrder.json',
      delay: 800
    }).as('createOrder');

    cy.visit('http://localhost:4000/', {
      onBeforeLoad(win) {
        win.document.cookie = 'accessToken=Bearer mockAccess';
        win.localStorage.setItem('refreshToken', 'mockRefresh');
      }
    });

    cy.wait(['@getIng', '@getUser']);
  });

  it('Проверка оформления заказа', function () {
    cy.wait('@getIng').then((interception) => {
      const ingredients = interception.response!.body.data;

      const bun = ingredients.filter((ing: TIngredient) => ing.type === 'bun');
      const mains = ingredients.filter(
        (ing: TIngredient) => ing.type === 'main'
      );
      const sauces = ingredients.filter(
        (ing: TIngredient) => ing.type === 'sauce'
      );

      cy.get('[data-cy="burger-constructor"]')
        .find(`[data-cy="ingredient-${ingredients._id}"]`)
        .should('not.exist');

      cy.get(`[data-cy="ingredient-${bun[1]._id}"]`).find('button').click();

      cy.get(`[data-cy="ingredient-${mains[2]._id}"]`).find('button').click();

      cy.get(`[data-cy="ingredient-${sauces[3]._id}"]`).find('button').click();

      cy.get('[data-cy="burger-constructor"]').should(
        'contain.text',
        bun[1].name
      );
      cy.get('[data-cy="burger-constructor"]').should(
        'contain.text',
        mains[2].name
      );
      cy.get('[data-cy="burger-constructor"]').should(
        'contain.text',
        sauces[3].name
      );

      cy.get('[data-cy="create-order"]').click();

      cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

      cy.get('[data-cy="modal-ingredient"]').should('be.visible');

      cy.fixture('createOrder.json').then((order) => {
        cy.get('[data-cy="order-number"]').should(
          'contain.text',
          order.order.number
        );

        cy.get('[data-cy="modal-close"]').click();
        cy.get('[data-cy="modal-ingredient"]').should('not.exist');

        cy.get('[data-cy="burger-constructor"]')
          .find(`[data-cy="ingredient-${ingredients._id}"]`)
          .should('not.exist');
      });
    });
  });
});
