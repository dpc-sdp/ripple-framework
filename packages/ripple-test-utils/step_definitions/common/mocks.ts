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
  `the site endpoint returns fixture {string} with status {int}`,
  (fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockRouteWithQuery', {
        route: '/api/tide/site',
        status,
        response,
        query: `?id=${Cypress.env('NUXT_PUBLIC_TIDE_SITE')}`
      })
    })
  }
)

Given(
  `the page endpoint for path {string} returns fixture {string} with status {int}`,
  (path: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockRouteWithQuery', {
        route: '/api/tide/page',
        status,
        response,
        query: `?path=${path}&site=${Cypress.env('NUXT_PUBLIC_TIDE_SITE')}`
      })
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
  `posting form to endpoint {string} returns fixture {string} with status {int}`,
  (route: string, fixture: string, status: number) => {
    cy.fixture(fixture).then((response) => {
      cy.task('setMockPostRouteWithQuery', {
        route,
        status,
        response,
        query: `?site=${Cypress.env('NUXT_PUBLIC_TIDE_SITE')}`
      })
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
      `/api/tide/app-search/**/elasticsearch/_search`,
      (req) => {
        // Filter out the aggregation requests (they have size=1)
        if (req.body.size === 0) {
          req.reply({
            statusCode: status,
            fixture: fixture
          })
          return
        }

        // Only apply the alias to the actual search request
        req.alias = 'searchReq' // assign an alias
        req.reply({
          statusCode: status,
          fixture: fixture
        })
      }
    )
  }
)

/* SEARCH */
Given(
  'the {string} network request is stubbed with fixture {string} and status {int} as alias {string}',
  (url: string, fixture: string, status: number, alias: string) => {
    cy.intercept('POST', url, (req) => {
      // Stub out aggregation requests
      if (req.body.size === 0) {
        req.reply({})
      } else {
        // Only apply the alias to the actual search request
        req.alias = alias // assign an alias
        req.reply({
          statusCode: status,
          fixture: fixture
        })
      }
    })
  }
)
Given(
  'the {string} aggregation request is stubbed with fixture {string} and status {int} as alias {string}',
  (url: string, fixture: string, status: number, alias: string) => {
    cy.intercept('POST', url, (req) => {
      // Filter out the aggregation requests (they have size=1)
      if (req.body.size === 0) {
        req.alias = 'aggReq' // assign an alias to aggregations
        req.reply({
          statusCode: status,
          fixture: fixture
        })
        return
      }
    })
  }
)

Given(
  'the search autocomplete request is stubbed with {string} fixture',
  (fixture: string) => {
    cy.intercept('POST', `/api/tide/app-search/**/query_suggestion`, {
      statusCode: 200,
      fixture
    }).as('autocompleteRequest') // assign an alias
  }
)

Then(
  'the search autocomplete request should be called with the {string} fixture',
  (requestFixture: string) => {
    cy.fixture(requestFixture).then((fixture) => {
      cy.get(`@autocompleteRequest`)
        .its('request.body')
        .should('deep.equal', fixture)
    })
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

Then(
  'the search aggregation request should be called with the {string} fixture',
  (requestFixture: string) => {
    cy.fixture(requestFixture).then((fixture) => {
      cy.get(`@aggReq`).its('request.body').should('deep.equal', fixture)
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

Given('time moves {int} second', (sec: number = 1) => {
  cy.tick(sec * 1000)
})
