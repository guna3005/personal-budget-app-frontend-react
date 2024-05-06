describe('LoginRegister Visual Test', () => {
    it('should display the LoginRegister page correctly', () => {
      cy.visit('/login-register'); // Adjust URL as needed
      cy.eyesOpen({
        appName: 'My App',
        testName: 'LoginRegister Page Visual Test',
        browser: { width: 800, height: 600 }
      });
      cy.eyesCheckWindow('Initial LoginRegister view');
      cy.eyesClose();
    });
  });
  