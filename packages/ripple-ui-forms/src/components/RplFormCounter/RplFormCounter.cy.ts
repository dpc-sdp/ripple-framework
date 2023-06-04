import RplFormCounter from './RplFormCounter.vue'

describe('<RplFormCounter />', () => {
  it('renders', () => {
    cy.mount(RplFormCounter, {
      props: { value: 'Lorem Ipsum' }
    })
  })

  it('displays the current character count', () => {
    cy.mount(RplFormCounter, {
      props: { value: 'L' }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 1 character')
  })

  it('displays the current pluralized character count', () => {
    cy.mount(RplFormCounter, {
      props: { value: 'Lorem' }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 5 characters')
  })

  it('displays the current word count', () => {
    cy.mount(RplFormCounter, {
      props: {
        type: 'word',
        value: 'Lorem Ipsum Dolar',
      }
    })
      .get('[data-cy="counter"]')
      .should('have.text', 'You have 3 words')
  })

})
