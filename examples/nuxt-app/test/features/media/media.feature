Feature: Media page

  Example of mocked page

  Background:
    Given the page endpoint for path "/media/36" returns fixture "/media/36" with status 200
    And the page endpoint for path "/media/271" returns fixture "/media/271" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Video
    When I visit the page "/media/36"
    Then the title should be "Demo: Embedded Video"
    And the media page should display content which includes "Video transcript content"
    And the media page should have the timestamp of "2022-10-26T01:06:33+00:00"
    And the media page should include an embedded "video" with source "https://www.youtube.com/embed/YYrvm5zaAjk"

  @mockserver
  Example: Audio
    When I visit the page "/media/271"
    Then the title should be "Demo: Audio"
    And the media page should display content which includes "Audio transcript content"
    And the media page should have the timestamp of "2022-08-22T01:06:00+00:00"
    And the media page should include an embedded "audio" with source "#audio-source"
