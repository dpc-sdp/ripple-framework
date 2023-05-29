Feature: Collection pages

  As a site I can see a collection of links to other pages and interact with it find the one I want.

  Background:
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Womens honor roll
    Given the endpoint "/api/tide/page" with query "?path=/victorian-honour-roll-of-women&site=8888" returns fixture "/collection/womens-honour-roll" with status 200
    When I visit the page "/emergency-recovery-resource-portal-search-for-resource"

