Feature: Grant page

  Example of mocked page

  Background:
    Given the page endpoint for path "/tc-9a-grant-simple-test-date-range" returns fixture "/grant/tc-9a-grant-simple-test-date-range" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Scenario: On load
    When I visit the page "/tc-9a-grant-simple-test-date-range"

    Then the title should be "TC-9a Grant Simple Test - Date Range"
    And the overview should display a status of "Closed" with a "red" "cancel" icon
    And the overview should display funding of "$11,326 - $26,494"
    And the first timeline item should have a date of "1 January 2020"
    When I click the open all button on accordion with ID "accordion-c6314c43-30f3-4454-84de-523db0e52d48"
    Then all accordion items in accordion ID "accordion-c6314c43-30f3-4454-84de-523db0e52d48" should be visible
    And the first document should have a title of "Demo Sample Document", and filesize of "7.53 KB"
