import { TIngredient } from '@utils-types';

describe('Тестирование ингредиентов главной страницы "/"', function () {
  beforeEach('Получение ингредиентов', function () {
    cy.fixture('ingredients').then((ing: TIngredient) => {
      cy.intercept(
        'GET',
        'https://norma.education-services.ru/api/ingredients',
        {
          statusCode: 200,
          body: ing
        }
      ).as('getIng');
    });

    cy.visit('http://localhost:4000/');
    cy.wait('@getIng');
  });

  it('Проверка добавление ингредиента в конструктор', function () {
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
    });
  });

  it('Проверка открытия и закрытия модального окна по кнопке', function () {
    cy.wait('@getIng').then((interception) => {
      const ingredients = interception.response!.body.data;

      cy.get(`[data-cy="ingredient-${ingredients[0]._id}"]`).click();
      cy.get('[data-cy="modal-ingredient"]')
        .should('be.visible')
        .and('contain.text', ingredients[0].name);

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal-ingredient"]').should('not.exist');
    });
  });

  it('Проверка закрытия модального окна по оверлею', function () {
    cy.wait('@getIng').then((interception) => {
      const ingredients = interception.response!.body.data;

      cy.get(`[data-cy="ingredient-${ingredients[0]._id}"]`).click();
      cy.get('[data-cy="modal-ingredient"]')
        .should('be.visible')
        .and('contain.text', ingredients[0].name);

      cy.get('[data-cy="modal-ingredient-overlay"]')
        .click({ force: true })
        .should('not.exist');
    });
  });
});
