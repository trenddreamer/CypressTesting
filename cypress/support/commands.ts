/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('clearRedis', () => {
  cy.exec('docker exec -d roadmap-redis redis-cli FLUSHALL', {
    timeout: 30000,
    failOnNonZeroExit: false,
  });
});

Cypress.Commands.add('vote', (id: string, title: string, ip: string) => {
    cy.request({
        method: "POST",
        url: "/api/vote",
        body: { title: title, id: id },
        headers: { "x-forwarded-for": ip },
      });
})

Cypress.Commands.add('createFeature', (title: string, ip: string) => {
    cy.request({
        method: "POST",
        url: "/api/create",
        body: { title: title },
        headers: { "x-forwarded-for": ip },
      });
})
