<script lang="ts">
export default { name: 'RplAccordion' }
</script>

<script setup lang="ts">
import { computed } from 'vue'

import RplIcon from '../icon/icon.vue'
import RplContent from '../content/content.vue'
import RplExpandable from '../expandable/expandable.vue'
import { useExpandableState } from '../../composables/useExpandableState'
import useRippleEvent from './../../composables/useRippleEvent'

const emit = defineEmits(['toggleAll', 'toggleItem'])
const { emitRplEvent } = useRippleEvent('rpl-accordion', emit)

type RplAccordionItem = {
  id: string
  title: string
  content: string
  active: boolean
}

interface Props {
  id: string
  items: RplAccordionItem[]
  numbered: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  numbered: false
})

const initialActiveIndexes: string[] = props.items.reduce(
  (result: string[], current: RplAccordionItem): string[] => {
    if (current.active) {
      return [...result, current.id]
    }

    return result
  },
  []
)

const { isItemExpanded, isAllExpanded, toggleItem } = useExpandableState(
  initialActiveIndexes,
  props.items.length
)

const toggleAll = () => {
  // Make all items active
  if (!isAllExpanded()) {
    emitRplEvent('toggleAll', { id: `accordion-${props.id}`, action: 'open' })
    props.items.forEach((item) => {
      // If the item is not expanded, make it expanded
      if (!isItemExpanded(item.id)) {
        toggleItem(item.id)
      }
    })
  }

  // Make all items inactive
  else {
    emitRplEvent('toggleAll', { id: `accordion-${props.id}`, action: 'close' })
    props.items.forEach((item) => {
      // If the item is expanded, make it not expanded
      if (isItemExpanded(item.id)) {
        toggleItem(item.id)
      }
    })
  }
}

const toggleAccordionItem = (item: RplAccordionItem) => {
  toggleItem(item.id)
  emitRplEvent('toggleItem', { label: `accordion-${props.id}-item-${item.title}`, action: isItemExpanded(item.id) ? 'open' : 'close' })
}

const toggleAllLabel = computed(() => {
  let label = 'Open all'

  if (isAllExpanded()) {
    label = 'Close all'
  }

  return label
})
</script>

<template>
  <div :id="id" class="rpl-accordion">
    <!-- Toggle all -->
    <div class="rpl-accordion__toggle-all-wrapper">
      <button v-if="items.length > 1" class="rpl-accordion__toggle-all rpl-u-focusable-inline" @click="toggleAll()">
        {{ toggleAllLabel }}
      </button>
    </div>

    <!-- Items -->
    <component :is="numbered ? 'ol' : 'ul'" class="rpl-accordion__items">
      <li v-for="(item, index) in items" :key="item.id" :class="{
        'rpl-accordion__item': true,
        'rpl-accordion__item--active': isItemExpanded(item.id)
      }">
        <!-- Item toggle -->
        <button :id="`accordion-${props.id}-${item.id}-toggle`" class="rpl-accordion__item-toggle rpl-u-focusable-block"
          type="button" :aria-controls="`accordion-${id}-${item.id}-content`" :aria-expanded="isItemExpanded(item.id)"
          @click="toggleAccordionItem(item)">
          <span class="rpl-accordion__item-heading-wrapper">
            <!-- Number -->
            <span v-if="numbered" class="rpl-accordion__item-number rpl-type-h4">
              {{ index + 1 }}
            </span>

            <!-- Title -->
            <span class="rpl-accordion__item-heading rpl-type-h4">
              {{ item.title }}
            </span>
          </span>

          <!-- Icon -->
          <span class="rpl-accordion__item-icon" aria-hidden="true">
            <RplIcon name="icon-chevron-down"></RplIcon>
          </span>
        </button>

        <!-- Item content -->
        <RplExpandable :id="`accordion-${id}-${item.id}-content`" :aria-labelledby="`accordion-${id}-${item.id}-toggle`"
          :aria-hidden="isItemExpanded(item.id) === false ? 'true' : null" :expanded="isItemExpanded(item.id)"
          class="rpl-accordion__item-content">
          <RplContent class="rpl-accordion__item-content-inner" :html="item.content">
          </RplContent>
        </RplExpandable>
      </li>
    </component>
  </div>
</template>

<style src="./accordion.css" ></style>
