describe('Login Test', () => {
    it('allows a user to log in successfully and redirect to dashboard', () => {
      cy.visit('/login');
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="password"]').type('password');
      cy.get('form').submit();
      cy.url().should('include', '/dashboard');
    });
  });
  