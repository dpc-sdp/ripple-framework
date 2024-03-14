import { When, Given } from '@badeball/cypress-cucumber-preprocessor'

Given(`I am using a {string} device`, (deviceString: any) => {
  cy.viewport(deviceString)
})

When('I visit the page {string}', (route: string) => {
  cy.visit(route, { failOnStatusCode: false })
  cy.get('body', { timeout: 20000 }).should(
    'have.attr',
    'data-nuxt-hydrated',
    'true'
  )
  cy.wait(200)
})

Given('I wait {int} seconds', (seconds: number) => {
  cy.wait(seconds * 1000)
})
Given('I pause the test', () => {
  cy.pause()
})
