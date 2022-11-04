import { contains } from "cypress/types/jquery";


describe('when adding request', () => {
  const toastSelector = '[role="status"]'
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

    it('the request should be added to the feature list', ()=> {
        cy.get('[cy-data = "featuresList"]').contains('Hello World!!')
        cy.get('[cy-data = "Hello World!!"]').contains('1')
    })

    it('should validate empty request input', () => {
      cy.get('[cy-data = "requestButton"]')
      .click();
      cy.get('[cy-data = "requestInput"]').invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.')
    })

  it('should validate maximum character request input', () => {
     cy.get('[cy-data = "requestInput"]')
    .type('Answer: 150 characters is between 21 words and 38 words with spaces included in the character count. If spaces are not included in the character count, then 150 characters is between 25 words and 50 words.');
    cy.get('[cy-data = "requestButton"]')
    .click();
    cy.wait(1000)
    cy.get(toastSelector).contains('Max 150 characters please.')
  })
  })

  describe('When subscribing with email address',() => {
    const toastSelector = '[role="status"]';
  it('should add email address', () => {
    cy.get('[cy-data = "subscribeInput"]')
    .type('samke@gmail.com');
    cy.get('[cy-data = "subscribeButton"]')
    .click();
    cy.get('[cy-data = "subscribeInput"]').should('have.value', '')
    cy.get(toastSelector).contains('You are now subscribed to feature updates!')
  })
  it('should validate empty request on subscribe input', () => {
    cy.get('[cy-data = "subscribeInput"]').should('have.value', '')
    cy.get('[cy-data = "subscribeButton"]')
    .click();
    cy.get('[cy-data = "subscribeInput"]').invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.') 
  })
  it('should validate invalid email without an @ symbol', ()=> {
    const invalidMsg = "Please include an '@' in the email address. 'barryw.com' is missing an '@'.";
    cy.get('[cy-data = "subscribeInput"]')
    .type('barryw.com');
    cy.get('[cy-data = "subscribeButton"]')
    .click();
    cy.get('[cy-data = "subscribeInput"]').invoke('prop', 'validationMessage').should('equal', invalidMsg)
  })
  })

  describe.only('Voting', ()=>{
    
    it('should be able to vote on a different IP', async ()=>{
      cy.request({ 
        method: 'POST',
         url: '/api/create',
         body: { "title": `New feature`} ,
          headers: {'x-forwarded-for': '192.168.0.5'}
        }
      )
      cy.request('http://localhost:3000/api/features').then((response) => {  
        expect(response.status).to.eq(200)  
        const feature = response.body.features[response.body.features.length -1]
        console.log(`=========>>>`,feature.id);
        cy.visit('http://localhost:3000')
        cy.get(`[cy-data = "${feature.id}"]`).contains('1')
        // .click();
        // cy.get(`[cy-data = "${feature.id}"]`).contains('2')
      })
    })

  })
