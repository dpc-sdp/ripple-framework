Feature: Maps

  As a site I can see a collection of links to other pages in a grid and interact with it to find the one I want.

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Maps
    Given the page endpoint for path "/search-list-map" returns fixture "/search-listing/map/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/map/response" and status 200
    When I visit the page "/search-list-map"
