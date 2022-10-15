

describe('request', () => {
    before(()=>{
        cy.visit('http://localhost:3000')
    })
    it('should add a request', () => {

      cy.get('[cy-data = "requestInput"]')
      .type('Hello World!!');

      cy.get('[cy-data = "requestButton"]')
      .click();
      cy.get('[cy-data = "requestInput"]')
      .should('have.value', '')
    })
    it('the request should be added to the feature list', ()=>{
        cy.get('[cy-data = "featuresList"]')
    })
  })