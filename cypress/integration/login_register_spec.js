describe('LoginRegister Test', () => {
    it('allows toggling between login and register forms', () => {
      cy.visit('/login-register'); // Adjust URL based on your routing setup
      cy.contains('Login').should('exist');
      cy.contains('Need to register?').click();
      cy.contains('Register').should('exist');
      cy.contains('Already have an account?').click();
      cy.contains('Login').should('exist');
    });
  });
  