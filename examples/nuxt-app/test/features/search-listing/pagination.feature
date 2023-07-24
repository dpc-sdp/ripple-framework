Feature: Searching listing - Pagination

  As a user I can navigate through pages of results using pagination controls

  Background:
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Pagination controls
    Given the endpoint "/api/tide/page" with query "?path=/pagination&site=8888" returns fixture "/search-listing/pagination/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/pagination/response-page-1" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"
    When I visit the page "/pagination"

    Then the search network request should be called with the "/search-listing/pagination/request-page-1" fixture
    And the results counter should show 1 to 4 of 10 results
    And the search listing results should have following items:
      | title   |
      | Oranges |
      | Apples  |
      | Pear    |
      | Tomato  |

    Given the search network request is stubbed with fixture "/search-listing/pagination/response-page-2" and status 200
    When I click on page 2 in the pagination controls
    Given I wait 1 seconds
    Then the search network request should be called with the "/search-listing/pagination/request-page-2" fixture
    And the URL should reflect that the current page number is 2
    And the results counter should show 5 to 8 of 10 results
    And the search listing results should have following items:
      | title        |
      | Brocoli      |
      | Dragon fruit |
      | Sushi        |
      | Bread        |


    Given the search network request is stubbed with fixture "/search-listing/pagination/response-page-3" and status 200
    When I click 'next' in the pagination controls
    Given I wait 1 seconds
    Then the search network request should be called with the "/search-listing/pagination/request-page-3" fixture
    And the URL should reflect that the current page number is 3
    And the results counter should show 9 to 10 of 10 results
    And the search listing results should have following items:
      | title   |
      | Soup    |
      | Biscuit |

    Given the search network request is stubbed with fixture "/search-listing/pagination/response-page-2" and status 200
    When I click 'previous' in the pagination controls
    Given I wait 1 seconds
    Then the search network request should be called with the "/search-listing/pagination/request-page-2" fixture
    And the URL should reflect that the current page number is 2
    And the results counter should show 5 to 8 of 10 results
    And the search listing results should have following items:
      | title        |
      | Brocoli      |
      | Dragon fruit |
      | Sushi        |
      | Bread        |

  @mockserver
  Example: Searching resets to page 1
    Given the endpoint "/api/tide/page" with query "?path=/pagination&site=8888" returns fixture "/search-listing/pagination/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/pagination/response-page-1" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"
    When I visit the page "/pagination"

    Given the search network request is stubbed with fixture "/search-listing/pagination/response-page-3" and status 200
    When I click on page 3 in the pagination controls
    Given I wait 1 seconds
    Then the URL should reflect that the current page number is 3
    And the results counter should show 9 to 10 of 10 results
    And the search listing results should have following items:
      | title   |
      | Soup    |
      | Biscuit |

    Given the search network request is stubbed with fixture "/search-listing/pagination/response-page-1" and status 200
    When I type "test" into the search input
    When I click the search button
    Given I wait 1 seconds
    Then the search network request should be called with the "/search-listing/pagination/request-page-1-with-term" fixture
    And the URL should reflect that the current page number is 1
    And the results counter should show 1 to 4 of 10 results
    And the search listing results should have following items:
      | title   |
      | Oranges |
      | Apples  |
      | Pear    |
      | Tomato  |

  @mockserver
  Example: Reads initial page from URL
    Given the endpoint "/api/tide/page" with query "?path=/pagination&site=8888" returns fixture "/search-listing/pagination/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/pagination/response-page-3" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"
    When I visit the page "/pagination?page=3"

    Then the search network request should be called with the "/search-listing/pagination/request-page-3" fixture
    And the URL should reflect that the current page number is 3
    And the results counter should show 9 to 10 of 10 results
    And the search listing results should have following items:
      | title   |
      | Soup    |
      | Biscuit |
