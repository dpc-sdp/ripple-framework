import { Then, When, DataTable } from '@badeball/cypress-cucumber-preprocessor'
import { set } from 'lodash-es'

Then(
  'the search listing page should have {int} results',
  (resultCount: number) => {
    cy.get(`[data-component-type="search-result"]`).should(
      'have.length',
      resultCount
    )
  }
)

Then(`the search listing results count should read {string}`, (str: string) => {
  cy.get(`[data-component-type="search-listing-result-count"]`).should(
    'contain',
    str
  )
})

Then('the search listing layout should be {string}', (layout: string) => {
  cy.get(`[data-component-type="search-listing-layout-${layout}"]`).should(
    'exist'
  )
})

Then(
  'the results counter should show {int} to {int} of {int} results',
  (start: number, end: number, total: number) => {
    cy.get('[data-component-type="search-listing-result-count"]').should(
      'contain',
      `Displaying ${start}-${end} of ${total} results`
    )
  }
)

Then(
  'the search listing skeleton should display {int} items with the class {string}',
  (items: number, selector: number) => {
    cy.get(`.${selector}`).should('have.length', items)
  }
)

Then(
  'the search listing result skeleton is set to the {string} component',
  (component: string) => {
    cy.get('@pageFixture').then((response) => {
      set(response, 'config.resultsConfig.layout.props.skeleton', component)
    })
  }
)

Then(
  'the search listing table result skeleton is set to the {string} component',
  (component: string) => {
    cy.get('@pageFixture').then((response) => {
      set(
        response,
        'config.resultsConfig.layout.props.columns[0].skeleton',
        component
      )
    })
  }
)

Then(
  'the URL should reflect that the current page number is {int}',
  (page: number) => {
    cy.location().should((loc) => {
      const params = new URLSearchParams(loc.search)
      expect(params.get('page')).to.eq(`${page}`)
    })
  }
)

Then('the URL should reflect that the current page has been reset', () => {
  cy.location().should((loc) => {
    const params = new URLSearchParams(loc.search)
    expect(params.get('page')).to.eq(null)
  })
})

Then(
  'the URL should reflect that the current sort option is {string}',
  (sortId: string) => {
    cy.location().should((loc) => {
      const params = new URLSearchParams(loc.search)
      expect(params.get('sort')).to.eq(`${sortId}`)
    })
  }
)

Then(
  'the URL should reflect that the current search term is {string}',
  (searchTerm: string) => {
    cy.location().should((loc) => {
      const params = new URLSearchParams(loc.search)

      if (searchTerm === '') {
        expect(params.get('q')).to.not.be.ok // should be falsey
      } else {
        expect(params.get('q')).to.eq(`${searchTerm}`)
      }
    })
  }
)

Then(
  'the URL should reflect that the current active filters are as follows:',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.location().should((loc) => {
      const params = new URLSearchParams(loc.search)

      table.forEach((row, i: number) => {
        const actualValue = params.getAll(row.id)
        const index = actualValue.length === 1 ? 0 : i

        if (!row.value) {
          expect(actualValue[index]).to.not.be.ok // should be falsey
        } else {
          expect(actualValue[index]).to.eq(row.value)
        }
      })
    })
  }
)

Then(
  'the search listing results should have following items:',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    table.forEach((row, i: number) => {
      cy.get(`[data-component-type="search-result"]`)
        .eq(i)
        .then((item) => {
          cy.wrap(item).should('contain', row.title)

          if (row.url) {
            cy.wrap(item).find('a').should('have.attr', 'href', row.url)
          }

          if (row.content) {
            cy.wrap(item).should('contain', row.content)
          }

          if (row.component) {
            cy.wrap(item).find('> *').should('have.class', row.component)
          }
        })
    })
  }
)

When(`I type {string} into the search input`, (inputStr: string) => {
  cy.get(`[id="tide-search-bar"]`).type(`${inputStr}`)
})

When(`I focus the search input`, () => {
  cy.get(`[id="tide-search-bar"]`).focus()
})

Then(`the search input should have the value {string}`, (inputStr: string) => {
  cy.get(`[id="tide-search-bar"]`).should(`have.value`, inputStr)
})

When(`I clear the search input`, () => {
  cy.get(`[id="tide-search-bar"]`).clear()
})

When(`I click the search button`, () => {
  cy.get(`.rpl-search-bar button[type="submit"]`).click()
})

Then(`I should be scrolled to the search results`, () => {
  cy.window()
    .its('scrollY')
    .should('equal', cy.$$('.rpl-layout__body-wrap').offset().top)
})

Then(`I should not be scrolled to the search results`, () => {
  cy.window()
    .its('scrollY')
    .should('be.lessThan', cy.$$('.rpl-layout__body-wrap').offset().top)
})

When(`I click on page {int} in the pagination controls`, (page: string) => {
  cy.get(`.rpl-pagination__page`).contains(`${page}`).click()
})

When(`I click 'next' in the pagination controls`, () => {
  cy.get(`.rpl-pagination__link`).contains(`Next`).click()
})

When(`I click 'previous' in the pagination controls`, () => {
  cy.get(`.rpl-pagination__link`).contains(`Previous`).click()
})

Then(
  'the no results message should show with the search term {string}',
  (searchTerm: string) => {
    cy.get(`[data-component-type="search-listing-no-results"]`).should('exist')
    cy.get(`[data-component-type="search-listing-no-results"]`).should(
      'contain',
      searchTerm
    )
  }
)

Then('the search error message should be displayed', () => {
  cy.get(`[data-component-type="search-listing-error"]`).should('exist')
  cy.get(`[data-component-type="search-listing-error"]`).should(
    'contain',
    'Sorry! Something went wrong. Please try again later.'
  )
})

Then(
  `the search listing dropdown field labelled {string} should have the value {string}`,
  (label: string, value: string) => {
    cy.contains('label', label)
      .invoke('attr', 'for')
      .then((dropdownId) => {
        cy.get(`#${dropdownId}`).as('selectedDropdown')
        cy.get('@selectedDropdown').should(($div) => {
          expect($div.get(0).innerText).to.eq(value)
        })
      })
  }
)

Then(
  `the selected dropdown field should allow {string} selection`,
  (type: string) => {
    const isMultiSelect = type === 'multi' ? 'true' : 'false'

    cy.get(`@selectedDropdown`)
      .siblings('[role="listbox"]')
      .should('have.attr', 'aria-multiselectable', isMultiSelect)
  }
)

Then(
  `the search listing checkbox field labelled {string} should be checked`,
  (label: string) => {
    cy.get(`label`)
      .contains(label)
      .parent('label')
      .invoke('attr', 'for')
      .then((checkboxId) => {
        cy.get(`#${checkboxId}`).should('be.checked')
      })
  }
)

Then(
  `the search listing checkbox group labelled {string} should have the following options checked`,
  (label: string, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get('.rpl-form-label')
      .contains(label)
      .parents('.rpl-form__fieldset')
      .find('.rpl-form-option-group')
      .as('checkboxGroup')

    table.forEach((row) => {
      cy.get('@checkboxGroup').within(() => {
        cy.contains('label', row.label)
          .invoke('attr', 'for')
          .then((checkboxId) => {
            cy.get(`#${checkboxId}`).should('be.checked')
          })
      })
    })
  }
)

Then(
  `the search listing checkbox group labelled {string} should not have any options checked`,
  (label: string) => {
    cy.get('.rpl-form-label')
      .contains(label)
      .parents('.rpl-form__fieldset')
      .find('.rpl-form-option-group input')
      .each(($el) => {
        cy.wrap($el).should('not.be.checked')
      })
  }
)

Then(
  `the search listing checkbox field labelled {string} should not be checked`,
  (label: string) => {
    cy.get(`label`)
      .contains(label)
      .parent('label')
      .invoke('attr', 'for')
      .then((checkboxId) => {
        cy.get(`#${checkboxId}`).should('not.be.checked')
      })
  }
)

When(
  `I click the search listing checkbox field labelled {string}`,
  (label: string) => {
    cy.get(`label`).contains(label).click()
  }
)

When(
  `I click the search listing dropdown field labelled {string}`,
  (label: string) => {
    cy.contains('label', label)
      .invoke('attr', 'for')
      .then((dropdownId) => {
        cy.get(`#${dropdownId}`).as('selectedDropdown').click()
      })
  }
)

When(
  `the search listing dropdown field labelled {string} should be disabled`,
  (label: string) => {
    cy.contains('label', label)
      .invoke('attr', 'for')
      .then((dropdownId) => {
        cy.get(`#${dropdownId}`).should('have.attr', 'disabled')
      })
  }
)

Then(
  `the search listing filters section should {}be open`,
  (clause: string) => {
    const not = clause.trim().length > 0 ? `${clause.trim()}.` : ''
    cy.get(`#tide-search-listing-filters`).should(`${not}be.visible`)
  }
)

When(`I toggle the search listing filters section`, () => {
  cy.get(`button`).contains('Refine search').as('refineBtn')
  cy.wait(300)
  cy.get('@refineBtn').click()
})

When(`I clear the search filters`, () => {
  cy.get(`button`).contains('Clear search filters').click()
})

When(`I submit the search filters`, () => {
  cy.get(`button`).contains('Apply search filters').click()
})

Then(
  'the filters toggle should show {int} applied filters',
  (filterCount: number) => {
    if (filterCount === 0) {
      cy.get(`button`)
        .contains('Refine search')
        .should(($div) => {
          expect($div.text().trim()).equal(`Refine search`)
        })
    } else {
      cy.get(`button`)
        .contains('Refine search')
        .should(($div) => {
          expect($div.text().trim()).equal(`Refine search (${filterCount})`)
        })
    }
  }
)

Then('the filters toggle should be hidden', () => {
  cy.get(`.tide-search-header .rpl-search-bar-refine`).should('not.exist')
})

Then(
  `I click the option labelled {string} in the selected dropdown`,
  (label: string) => {
    cy.get(`@selectedDropdown`)
      .siblings('[role="listbox"]')
      .find('[role="option"]')
      .contains(label)
      .click()
  }
)

Then(
  `the selected dropdown field should have the items:`,
  (dataTable: DataTable) => {
    const table = dataTable.raw()
    cy.get(`@selectedDropdown`)
      .siblings('[role="listbox"]')
      .find('[role="option"]')
      .not('[id$="__default-option"]')
      .as('selectedDropdownOptions')

    table.forEach((row, i: number) => {
      cy.get('@selectedDropdownOptions')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row[0])
        })
    })
  }
)

Then(
  'the {string} pagination link should have an aria-label {string}',
  (label: string, text: string) => {
    cy.get('.rpl-pagination__link')
      .contains(label)
      .should('have.attr', 'aria-label', text)
  }
)

Then(
  'the {string} complex pagination link should have an aria-label {string}',
  (label: string, text: string) => {
    cy.get('.rpl-pagination__page')
      .contains(label)
      .parent()
      .should('have.attr', 'aria-label', text)
  }
)

Then('the sort dropdown should be visible', () => {
  cy.get(`#search-listing-sort-options`).should('exist')
})

Then('the sort dropdown should not be visible', () => {
  cy.get(`#search-listing-sort-options`).should('not.exist')
})

Then(
  'the sort dropdown should have the {string} option selected',
  (option: string) => {
    cy.get(`#search-listing-sort-options`).should('contain', option)
  }
)

Then('the search form should be hidden', () => {
  cy.get(`.tide-search-header`).should('not.exist')
})

Then(
  'the search input should be have a max length of {int}',
  (maxLength: number) => {
    cy.get(`.rpl-search-bar input`).should('have.attr', 'maxlength', maxLength)

    cy.get(`.rpl-search-bar input`).type(new Array(maxLength + 5).join('A'))
    cy.get(`.rpl-search-bar input`).should(
      'have.value',
      new Array(maxLength + 1).join('A')
    )
  }
)

Then('only the search filters should be visible', () => {
  cy.get(`.tide-search-header .rpl-search-bar`).should('not.exist')
  cy.get(`.tide-search-header .rpl-search-bar-refine`).should('not.exist')
  cy.get(`#tide-search-filter-form`).should('exist')
})

Then(
  `the number of search suggestions displayed should be {int}`,
  (num: number) => {
    cy.get('.rpl-search-bar__menu-option').should('have.length', num)
  }
)

Then(
  `the search suggestions displayed should include`,
  (dataTable: DataTable) => {
    const table = dataTable.raw()
    cy.get('.rpl-search-bar__menu')
      .find('[role="option"]')
      .as('suggestedOptions')

    table.forEach((row, i: number) => {
      cy.get('@suggestedOptions')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row[0])
        })
    })
  }
)

When('I click the search suggestion labelled {string}', (label: string) => {
  cy.get('.rpl-search-bar__menu')
    .find('[role="option"]')
    .contains(label)
    .click()
})

Then('the search suggestions should not be displayed', () => {
  cy.get('#tide-search-bar__menu').should('not.exist')
})

Then('a custom component should be rendered below the filter', () => {
  cy.get('[data-cy="below-filter-component"]').should('be.visible')
})

Then(
  'the search listing config has {string} set to {string}',
  (key: string, value: string | boolean) => {
    cy.get('@pageFixture').then((response) => {
      if (value === 'true') value = true
      if (value === 'false') value = false
      set(response, `config.searchListingConfig.${key}`, value)
    })
  }
)
