Feature: Search listing - Suggestions

  As a user I can see a list of suggested autocomplete values

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Displays autocomplete suggestions (app-search)
    Given the page endpoint for path "/suggestions" returns fixture "/search-listing/suggestions/page-suggestions" with status 200
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/response" fixture

    When I visit the page "/suggestions"
    Then the search listing page should have 2 results

    When I type "The" into the search input
    Then the search autocomplete request should be called with the "/search-listing/suggestions/request" fixture
    And the search suggestions displayed should include
      | the   |
      | there |
      | their |

    When I click the search suggestion labelled "there"
    Then the search input should have the value "there"

  @mockserver
  Example: Displays autocomplete suggestions (elasticsearch)
    Given I load the page fixture with "/search-listing/suggestions/page-suggestions-elastic"
    And the search listing config has "suggestions.promoted" set to ""
    Then the page endpoint for path "/suggestions" returns the loaded fixture
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the elasticsearch autocomplete request is stubbed with "/search-listing/suggestions/response-elastic" fixture

    When I visit the page "/suggestions"
    Then the search listing page should have 2 results

    When I type "The" into the search input
    Then the search autocomplete request should be called with the "/search-listing/suggestions/request-elastic" fixture
    And the search suggestions displayed should include
      | The first result  |
      | There we are      |
      | Third is the best |

    When I click the search suggestion labelled "There we are"
    Then the search input should have the value "There we are"

  @mockserver
  Example: Autocomplete suggestions search key can be overridden (app-search)
    Given I load the page fixture with "/search-listing/suggestions/page-suggestions"
    And the search listing config has "suggestions.key" set to "suggestion_override_key"
    Then the page endpoint for path "/suggestions-override" returns the loaded fixture
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/response" fixture

    When I visit the page "/suggestions-override"
    And I type "The" into the search input
    Then the search autocomplete request should be called with the "/search-listing/suggestions/request-override" fixture

  @mockserver
  Example: Autocomplete suggestions properties can be overridden (elastic)
    Given I load the page fixture with "/search-listing/suggestions/page-suggestions-elastic"
    And the search listing config has "suggestions.promoted" set to ""
    And the search listing config has "suggestions.key" set to "suggestion_override_key"
    And the search listing config has "suggestions.displayKey" set to "suggestion_override_display_key"
    And the search listing config has "suggestions.type" set to "bool_prefix"
    Then the page endpoint for path "/suggestions-override" returns the loaded fixture
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the elasticsearch autocomplete request is stubbed with "/search-listing/suggestions/response-override-elastic" fixture

    When I visit the page "/suggestions-override"
    And I type "The" into the search input
    Then the search autocomplete request should be called with the "/search-listing/suggestions/request-override-elastic" fixture
    And the search suggestions displayed should include
      | The first override |
      | There we are       |
      | Third is the best  |

  @mockserver
  Example: Autocomplete suggestions can be disabled
    Given I load the page fixture with "/search-listing/suggestions/page-suggestions"
    And the search listing config has "suggestions.enabled" set to "false"
    Then the page endpoint for path "/no-suggestions" returns the loaded fixture

    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/response" fixture

    When I visit the page "/no-suggestions"
    Then the search listing page should have 2 results

    When I type "The" into the search input
    Then the search suggestions should not be displayed

  @mockserver
  Example: Promoted suggestions can be used as starting suggestions
    Given the page endpoint for path "/promoted" returns fixture "/search-listing/suggestions/page-suggestions-elastic" with status 200
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200

    When I visit the page "/promoted"
    When I focus the search input
    And the search suggestions displayed should include
      | Community Grants |
      | Growth Programs  |
      | Support Programs |

  @mockserver
  Example: Suggestion history can be displayed for user convenience
    Given the page endpoint for path "/history" returns fixture "/search-listing/suggestions/page-suggestions-elastic" with status 200
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the elasticsearch autocomplete request is stubbed with "/search-listing/suggestions/none-elastic" fixture

    When I visit the page "/history"
    When I type "The" into the search input
    And I click the search button
    Then I clear the search input
    Then I type "Test" into the search input
    And I click the search button
    Then I clear the search input
    Then I type "Testing" into the search input
    And I click the search button
    Then I clear the search input
    And I focus the search input
    And the number of search suggestions displayed should be 5
    And the search suggestions displayed should include
      | Testing |
      | Test    |

  @mockserver
  Example: Suggestion synonyms are used in suggestion query
    Given the page endpoint for path "/synonyms" returns fixture "/search-listing/suggestions/page-suggestions-elastic" with status 200
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the elasticsearch autocomplete request is stubbed with "/search-listing/suggestions/none-elastic" fixture

    When I visit the page "/synonyms"
    When I type "kindy" into the search input
    Then the search autocomplete request should be called with the "/search-listing/suggestions/request-synonyms-word" fixture

  @mockserver
  Example: Suggestion synonyms are used in suggestion query (phrase)
    Given the page endpoint for path "/synonyms" returns fixture "/search-listing/suggestions/page-suggestions-elastic" with status 200
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the elasticsearch autocomplete request is stubbed with "/search-listing/suggestions/none-elastic" fixture

    When I visit the page "/synonyms"
    When I type "first peoples" into the search input
    Then the search autocomplete request should be called with the "/search-listing/suggestions/request-synonyms-phrase" fixture

  @mockserver
  Example: Search bar max input length
    Given the page endpoint for path "/suggestions" returns fixture "/search-listing/suggestions/page-suggestions" with status 200
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/response" fixture

    When I visit the page "/suggestions"
    Then the search input should be have a max length of 128
