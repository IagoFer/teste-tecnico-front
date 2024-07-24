// cypress/integration/pagination.spec.js
describe('Pagination', () => {
  it('should display users on different pages', () => {
    cy.visit('/usuarios');
    
    // Aguarde até que a página e os itens do usuário sejam carregados
    cy.intercept('GET', '**/api/users**').as('getUsers');
    cy.wait('@getUsers');
    
    cy.get('.user-item').should('have.length', 5);
    
    // Navegue para a próxima página
    cy.get('button').contains('Próximo').click();
    cy.wait('@getUsers');
    cy.get('.user-item').should('have.length', 5);
    
    // Navegue de volta para a página anterior
    cy.get('button').contains('Anterior').click();
    cy.wait('@getUsers');
    cy.get('.user-item').should('have.length', 5);
  });
});
