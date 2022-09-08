---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/storybook/ripple-tide-<%= h.changeCase.paramCase(name) %>.stories.mdx
---

import {
  Canvas,
  Meta,
  Story
} from '@storybook/addon-docs'
import { default as Layout } from './layout.vue'
import FIXTURE from './fixture.json'

<Meta title='Content types/<%= h.changeCase.sentenceCase(name) %>' />

# <%= h.changeCase.sentenceCase(name) %>

<Canvas>
  <Story
    name='<%= h.changeCase.sentenceCase(name) %>'
    parameters={{
      layout: 'fullscreen'
    }}
  >
    {() => {
      return {
        components: { Layout },
        setup() {
          return { FIXTURE }
        },
        template: `<layout :page="FIXTURE"></layout>`
      }
    }}
  </Story>
</Canvas>
