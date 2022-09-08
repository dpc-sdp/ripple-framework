---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/storybook/fixture.json
---

{
  "title": "Demo Landing Page",
  "changed": "2022-08-25T12:49:44+10:00",
  "created": "2022-08-25T12:49:44+10:00",
  "type": "landing_page",
  "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus.",
  "headerComponents": [
    {
      "uuid": "c0c9d810-35b8-48a8-b480-baecbc5b28a3",
      "component": "Tide<%= h.changeCase.pascalCase(name) %>PageIntroBanner",
      "id": 697,
      "props": {
        "title": "Nulla ultricies dignissim leo, posuere vestibulum erat cursus vitae",
        "links": [
          {
            "title": "Nullam laoreet",
            "url": "https://vic.gov.au"
          },
          {
            "title": "Morbi cursus placerat mi",
            "url": "https://vic.gov.au"
          }
        ],
        "html": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus."
      }
    }
  ],
  "bodyComponents": [
    {
      "uuid": "37b51442-720c-4b93-aaab-80ac890c64d6",
      "component": "RplContent",
      "id": 678,
      "props": {
        "html": "<h2>Nulla ultricies dignissim leo, posuere vestibulum erat cursus vitae</h2>\n<h3>Phasellus congue aliquam vehicula</h3>\n<p class=\"rpl-callout\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus. Quisque nec congue ligula, vitae condimentum tellus. Nulla nec urna augue. Curabitur commodo nisi est, eu pulvinar tortor cursus vel. Morbi dictum ex est, et semper diam finibus eu. Cras rutrum, nunc a fringilla convallis, massa est vulputate velit, in blandit augue dui vitae elit. Donec hendrerit commodo augue, in maximus orci tempor congue. Mauris ultricies euismod orci, nec vehicula quam vehicula ac. Nunc dictum tortor dolor, nec eleifend orci luctus sed.</p>\n<h3>Donec scelerisque cursus ex varius efficitur</h3>\n<h4>Morbi cursus placerat mi</h4>\n<h5>Nullam laoreet ante placerat</h5>\n<p>Integer interdum nisl ut neque dictum, et sagittis metus feugiat. Sed in mattis neque. Duis at risus non ipsum semper dapibus. Sed enim sapien, molestie sed commodo vel, lacinia vitae risus. Proin sagittis diam nisi, sed rhoncus diam varius id. Sed malesuada felis tortor, scelerisque pretium elit tempor non. Pellentesque ultrices volutpat tincidunt. Fusce quis viverra urna, quis finibus nulla.</p>\n<blockquote class=\"quotation\">\n  <p>Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. Phasellus lacus lectus, sollicitudin sed posuere non, ultricies ut quam.</p>\n  <footer>\n    <cite>\n      <span class=\"quotation__author\">Duis ligula lacus</span><br>\n      <span class=\"quotation__author-title\">Phasellus est turpis, efficitur nec odio imperdiet</span><br>\n    </cite>\n  </footer>\n</blockquote>\nMauris tincidunt tincidunt felis vel tempus\n<img src=\"https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg\" class=\"rpl-img\" width=\"1413\" alt=\"Demo: Melbourne tram\" srcset=\"https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg?width=606,\n      https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg?width=1212 2x\">\n\n<p>Phasellus in varius leo. Suspendisse potenti. Donec scelerisque cursus ex varius efficitur. Vivamus pretium nisi sed libero accumsan mattis. Duis convallis, velit eget varius tempus, orci erat aliquam sem, eget porta mauris nisl at mauris.</p>\n<div data-embed-button=\"tide_media\" data-entity-embed-display=\"view_mode:media.embedded\" data-entity-type=\"media\" data-entity-uuid=\"11dede11-10c0-111e1-1100-000000000007\" data-langcode=\"en\" class=\"embedded-entity embedded-entity--media embedded-entity--media--document\"><article class=\"media media--type-document media--view-mode-embedded\">\n  \n      \n            <div class=\"field field--name-field-media-file field--type-file field--label-hidden field__item\">\n<span class=\"file file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document file--x-office-document\"> <a href=\"https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/sample.docx\" class=\"x-office-document\" aria-label=\"Demo Sample Document File type: Word. Size: 7.53 KB.\"><span class=\"file--title\">Demo Sample Document</span><span class=\"file--type\">Word</span><span class=\"file--size\">7.53 KB</span></a></span>\n</div>\n      \n  </article>\n</div>\n"
      }
    }
  ]
}
