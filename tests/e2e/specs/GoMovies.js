describe('LatestMovie', () => {
  it('Visits the latest movie page', () => {
    cy.visit('/');
    cy.get('h1').contains('Recherchez');
  });
});

describe('App', () => {
  it('Bouton rechercher ne marche pas sans texte', () => {
    cy.get('.searchButton').should('not.exist');
  });

  it('Recherche', () => {
    cy.get('.searchString').type('hulk');
    cy.get('.searchButton').should('exist');
    cy.get('.searchButton').click();
  });
});