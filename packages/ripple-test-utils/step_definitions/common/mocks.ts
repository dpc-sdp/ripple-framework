import {
  Then,
  Given,
  Before,
  After
} from '@badeball/cypress-cucumber-preprocessor'

Before({ tags: '@mockserver' }, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

After({ tags: '@mockserver' }, () => {
  cy.log('the mock server has stopped')
  cy.task('stopMockServer')
})

Given(`the mock server has started`, () => {
  cy.log('the mock server has started')
  cy.task('startMockServer')
})

Given(`the mock server has started with proxy`, () => {
  cy.log('the mock server has started, unmatched routes will be proxied')
  cy.task('startMockServer', true)
})

Given(`the mock server has been stopped`, () => {
  cy.task('stopMockServer')
  cy.log('the mock server has been stopped')
})

Given(
  `the endpoint {string} with query {string} returns fixture {string} with status {int}`,
  (route: string, query: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockRouteWithQuery', { route, status, response, query })
    })
  }
)

Given(
  `the endpoint {string} returns fixture {string} with status {int}`,
  (route: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockRoute', { route, status, response })
    })
  }
)

Given(
  `posting to endpoint {string} with query {string} returns fixture {string} with status {int}`,
  (route: string, query: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockPostRouteWithQuery', { route, status, response, query })
    })
  }
)

Given(
  `posting to endpoint {string} returns fixture {string} with status {int}`,
  (route: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockPostRoute', { route, status, response })
    })
  }
)

/* SEARCH */
Given(
  'the search network request is stubbed with fixture {string} and status {int}',
  (fixture: string, status: number) => {
    cy.intercept(
      'POST',
      `/api/tide/search/${Cypress.env('searchIndex')}/elasticsearch/_search`,
      {
        statusCode: status,
        fixture
      }
    ).as('searchReq') // assign an alias
  }
)

Given(
  'the search autocomplete request is stubbed with {string} fixture',
  (fixture: string) => {
    cy.intercept(
      'POST',
      `/api/tide/search/${Cypress.env('searchIndex')}/query_suggestion`,
      {
        statusCode: 200,
        fixture
      }
    ).as('autocompleteRequest') // assign an alias
  }
)

Then(
  'the search network request should be called with the {string} fixture',
  (requestFixture: string) => {
    cy.fixture(requestFixture).then((fixture) => {
      cy.get(`@searchReq`).its('request.body').should('deep.equal', fixture)
    })
  }
)

Given('the current date is {string}', (dateString: string) => {
  const timeTravel = new Date(dateString).getTime()
  cy.clock(timeTravel)
})

Given('the current date is restored', () => {
  cy.clock().invoke('restore')
})
