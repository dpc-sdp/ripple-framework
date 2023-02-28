import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(
  'the site header background color should be {string}',
  (colour: string) => {
    cy.get(`.rpl-primary-nav__inner`).should(
      'have.css',
      'background-color',
      colour
    )
  }
)

Then(
  'the site footer should have the {string} theme applied',
  (theme: string) => {
    cy.get(`[data-component-type="site-footer"]`).should(
      'have.class',
      `rpl-footer--${theme}`
    )
  }
)
Then(
  'ripple buttons should have the {string} theme applied',
  (theme: string) => {
    cy.get(`.rpl-button`).should('have.class', `rpl-button--${theme}`)
  }
)
Then(
  'the hero banner should have the {string} theme applied',
  (theme: string) => {
    cy.get(`.rpl-header`).should('have.class', `rpl-header--${theme}`)
  }
)
