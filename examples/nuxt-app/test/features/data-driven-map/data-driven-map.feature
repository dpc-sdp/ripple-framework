Feature: Data driven map

  Map stuff

  Background:
    Given the mock server has started with proxy
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    Given I am using a "macbook-16" device

  Scenario: Cameras save lives
    Given the page endpoint for path "/csl" returns fixture "/data-driven-map/csl/page" with status 200
    # Given the "/api/tide/elasticsearch/sdp_data_pipelines_scl/_search" network request is stubbed with fixture "/data-driven-map/csl/response" and status 200 as alias "cslReq"
    Given I visit the page "/csl"
    And I wait 30 seconds
    Then the landing page component "TideDataDrivenMap" should exist

  @focus
  Scenario: School buildings
    Given the page endpoint for path "/school-buildings" returns fixture "/data-driven-map/schools/page" with status 200
    Given I visit the page "/school-buildings"
    And I wait 30 seconds
    Then the landing page component "TideDataDrivenMap" should exist
