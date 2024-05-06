describe('Homepage Visual Test', () => {
    it('should display the homepage correctly', () => {
      cy.visit('/');
      cy.eyesOpen({
        appName: 'My App',
        testName: 'Homepage Visual Test',
        browser: { width: 800, height: 600 }
      });
      cy.eyesCheckWindow('Homepage view');
      cy.eyesClose();
    });
  });
  