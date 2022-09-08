---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/storybook/layout.vue
---

<script setup lang="ts">
import { RplContent } from '@dpc-sdp/ripple-ui-core'
import type Tide<%= h.changeCase.pascalCase(name) %>Page from '../../types'

interface Props {
  page: Tide<%= h.changeCase.pascalCase(name) %>Page
}

defineProps<Props>()

const mapComponent = (component: string) => {
  switch (component) {
    case 'Tide<%= h.changeCase.pascalCase(name) %>PageIntroBanner':
    case 'RplContent':
      return RplContent
  }
}
</script>

<template>
  <header class="tba rpl-u-margin-b-5">
    <div class="rpl-container">[ PAGE HEADER ]</div>
  </header>
  <div class="rpl-container">
    <div class="rpl-grid">
      <div v-if="page.headerComponents?.length > 0" class="rpl-col-12">
        <div
          v-for="cmp in page.headerComponents"
          :key="`component-${cmp.id}`"
          :data-component-id="cmp.id"
          :data-component-type="cmp.component"
          class="rpl-col-12"
        >
          <component
            :is="mapComponent(cmp.component)"
            v-bind="cmp.props"
          ></component>
        </div>
      </div>
      <div v-if="page.bodyComponents?.length > 0" class="rpl-col-12">
        <div
          v-for="cmp in page.bodyComponents"
          :key="`component-${cmp.id}`"
          :data-component-id="cmp.id"
          :data-component-type="cmp.component"
          class="rpl-u-margin-t-9 rpl-u-margin-b-9 rpl-col-12 rpl-col-9-m"
        >
          <component
            :is="mapComponent(cmp.component)"
            v-bind="cmp.props"
          ></component>
        </div>
      </div>
    </div>
  </div>
  <footer class="tba rpl-u-margin-t-5">
    <div class="rpl-container">[ PAGE FOOTER ]</div>
  </footer>
</template>

<style>
.tba {
  --clr: 0deg 0% 10%;

  background: hsl(var(--clr) / 5%);
  color: hsl(var(--clr));
  font-size: 2rem;
  padding: 2rem 0;
  width: 100%;
}

header.tba {
  border-bottom: 2px dashed hsl(var(--clr) / 10%);
}

footer.tba {
  border-top: 2px dashed hsl(var(--clr) / 10%);
}
</style>
