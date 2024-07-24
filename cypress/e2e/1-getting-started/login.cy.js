// cypress/integration/login.spec.js
describe('Entrar', () => {
    it('should log in and redirect to dashboard', () => {
      cy.visit('/entrar');
      cy.get('input[type="email"]').type('eve.holt@reqres.in');
      cy.get('input[type="password"]').type('cityslicka');
      cy.get('button').click();
  
      cy.url().should('include', '/painel');
      cy.contains('Sair').should('be.visible');
    });
  });
  