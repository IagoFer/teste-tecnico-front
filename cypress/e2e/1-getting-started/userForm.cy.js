// cypress/integration/userForm.spec.js
describe('User Form', () => {
  beforeEach(() => {
    cy.visit('/usuarios'); // Ajuste se necessário
    
    // Aguarde até que a página esteja completamente carregada
    cy.intercept('GET', '**/api/users**').as('getUsers');
    cy.wait('@getUsers');
  });

  it('should open and close the user form modal', () => {
    // Verifique se o botão "Adicionar Usuário" está presente
    cy.get('button').contains('Adicionar Usuário').should('be.visible').click();
    
    // Verifique se o modal está visível
    cy.get('.modal').should('be.visible');
    
    // Feche o modal
    cy.get('.close-btn').click();
    
    // Verifique se o modal não está mais visível
    cy.get('.modal').should('not.exist');
  });

  it('should submit the form and show success modal', () => {
    // Abra o formulário do usuário
    cy.get('button').contains('Adicionar Usuário').should('be.visible').click();
    
    // Preencha o formulário com dados de teste
    cy.get('#name').type('John');
    cy.get('#job').type('Developer');
    
    // Envie o formulário
    cy.get('button').contains('Criar').click();
    
    // Verifique se o modal de sucesso está visível
    cy.get('.success-modal-content').should('be.visible');
  });
});
