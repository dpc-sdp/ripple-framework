Feature: Search listing - Aggregations

  As a user I can see lists of values filter values, sourced from either drupal Taxonomies or Elastic Aggregations

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Aggregations and Taxonomies
    Given the page endpoint for path "/aggregations" returns fixture "/search-listing/aggregations/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/aggregations/response" and status 200

    When I visit the page "/aggregations"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/aggregations/request" fixture

    When I toggle the search listing filters section
    When I click the search listing dropdown field labelled "Elastic aggregation test"
    # First item is hardcoded, the rest come from ES aggregation
    Then the selected dropdown field should have the items:
      | Hard coded            |
      | Business              |
      | Government            |
      | Individual            |
      | Not-for-profit groups |
    And I click the option labelled "Business" in the selected dropdown
    # Close the dropdown
    When I click the search listing dropdown field labelled "Elastic aggregation test"

    When I click the search listing dropdown field labelled "Taxonomy test"
    # These come from Tide page API response (taxonomies)
    Then the selected dropdown field should have the items:
      | Arts     |
      | Business |
    And I click the option labelled "Arts" in the selected dropdown
    And I click the search listing dropdown field labelled "Taxonomy test"

    When I submit the search filters
    Then the URL should reflect that the current active filters are as follows:
      | id       | value    |
      | audience | Business |
      | topic    | Arts     |
