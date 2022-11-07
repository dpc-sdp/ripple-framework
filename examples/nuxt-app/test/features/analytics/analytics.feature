Feature: Analytics page

  Example of mocked page

  Example: On load
    Given the mock server has started
    And the endpoint "/api/tide/page" with query "?path=/sample-analytics&site=8888" returns fixture "/analytics/sample-analytics" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    Given I visit the page "/sample-analytics"
    Then the title should be "Sample Analytics"
