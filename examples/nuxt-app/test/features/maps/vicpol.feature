Feature: Vicpol map

  I want to display a map of features from an indexed data pipeline

  Background:
    Given the page endpoint for path "/map" returns fixture "/map-table/vicpol/page" with status 200
    Given the site endpoint returns fixture "/site/vicpol" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    Given I am using a "macbook-16" device
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vicpol/response" and status 200 as alias "searchReq"
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" aggregation request is stubbed with fixture "/map-table/vsba/aggregations" and status 200 as alias "aggReq"
  # Given the "/api/tide/app-search/vic-postcode-localities/search" network request is stubbed with fixture "/map-table/vsba/localities" and status 200 as alias "localitiesReq"
  # Given the "/api/tide/app-search/vic-postcode-localities/elasticsearch/_search" network request is stubbed with fixture "/map-table/vsba/localities" and status 200 as alias "aggReq"


  @mockserver
  Scenario: On load
    Given I visit the page "/map"
    Then the landing page component "TideCustomCollection" should exist
    Then the custom collection component should have a search input bar
    And the ripple map component should be visible
    And the data map component tabs should exist
    And the data map tabs should be labelled:
      | Map  |
      | List |
    And I pause the test
  # And the map matches the image snapshot "map-on-load"

  @mockserver @focus
  Scenario: On geolocation click
    Given the "/api/tide/app-search/vic-postcode-localities/search" network request is stubbed with fixture "/map-table/vicpol/localities-nearby" and status 200 as alias "localitiesNearbyReq"
    Given I visit the page "/map" from location 144.9631, -36.8136
    When I click the map search geolocation button
    Then the map matches the image snapshot "map-on-geolocate"
