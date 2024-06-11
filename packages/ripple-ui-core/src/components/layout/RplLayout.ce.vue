<script setup lang="ts">
import { useSlots } from 'vue'
import RplLayoutBackToTop from './RplLayoutBackToTop.vue'
import RplLayoutSkipLink from './RplLayoutSkipLink.vue'

interface Props {
  background?: 'default' | 'alt'
  showBackToTop?: boolean
  direction?: string
  language?: string
}

withDefaults(defineProps<Props>(), {
  background: 'default',
  showBackToTop: true,
  direction: undefined,
  language: undefined
})

const $slots = useSlots()

const aboveBodyId = 'rpl-above-body'
const belowBodyId = 'rpl-below-body'
const mainId = 'rpl-main'
const skipLinksId = 'rpl-skip-links'
</script>

<template>
  <link rel="stylesheet" href="./rpl-global.css" />
  <div>
    <div :id="skipLinksId">
      <RplLayoutSkipLink :targetId="$slots.aboveBody ? aboveBodyId : mainId"
        >Skip to main content</RplLayoutSkipLink
      >
    </div>
    <div :class="`rpl-layout rpl-layout--${background}`">
      <slot name="above-header"></slot>
      <div class="rpl-layout__container">
        <header id="rpl-header" class="rpl-layout__header">
          <slot name="primary-nav"></slot>
          <div
            v-if="hasBreadcrumbs"
            id="rpl-below-header"
            class="rpl-u-margin-t-1"
          >
            <slot name="breadcrumbs"></slot>
          </div>
        </header>
        <section :id="aboveBodyId">
          <slot name="above-body" :hasBreadcrumbs="hasBreadcrumbs"></slot>
        </section>
        <div class="rpl-layout__body-wrap">
          <div class="rpl-container">
            <div class="rpl-grid rpl-grid--no-row-gap rpl-layout__body">
              <main
                :id="mainId"
                :class="{
                  'rpl-col-12': true,
                  'rpl-col-7-m': hasSidebar,
                  [`${language}`]: language
                }"
                class="rpl-layout__main"
                :dir="direction"
              >
                <slot name="body" :hasSidebar="hasSidebar"></slot>
              </main>
              <aside
                v-if="hasSidebar"
                id="rpl-sidebar"
                class="rpl-layout__sidebar rpl-col-4-m rpl-col-start-9-m rpl-col-12"
              >
                <slot name="sidebar"></slot>
              </aside>
            </div>
          </div>
        </div>
        <section v-if="$slots.belowBody" :id="belowBodyId">
          <slot name="below-body"></slot>
        </section>
        <RplLayoutBackToTop v-if="showBackToTop" topElementId="skipLinksId" />
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style src="./RplLayout.css" />
