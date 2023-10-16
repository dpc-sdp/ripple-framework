<template>
  <div class="tide-search-address-lookup">
    <RplSearchBar
      inputLabel="Enter a search term"
      :submitLabel="false"
      :inputValue="inputValue"
      :suggestions="results"
      :showNoResults="true"
      :debounce="5000"
      placeholder="Search by address, postcode or suburb"
      :getSuggestionVal="(itm:any) => itm.name"
      @submit="submitAction"
      @update:input-value="onUpdate"
    >
      <template #suggestion="{ option: { option } }">
        <span>{{ option.name }}</span>
        <RplChip
          v-if="option?.council"
          class="rpl-u-margin-l-4"
          :label="option?.council"
        ></RplChip>
      </template>
    </RplSearchBar>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import { useDebounceFn } from '@vueuse/core'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  addresses: boolean
  lgas: boolean
  suburbs: boolean
}

const props = withDefaults(defineProps<Props>(), {
  addresses: true,
  lgas: true,
  suburbs: true
})

const results = ref([])
const inputValue = ref('')

type addressResultType = {
  name: string
  latitude: number
  longitude: number
}

const emit = defineEmits<{
  (e: 'update', payload: addressResultType): void
}>()
const { emitRplEvent } = useRippleEvent('tide-address-lookup', emit)

async function submitAction(e: any) {
  const item = e.value
  emitRplEvent('update', item)
}

const onUpdate = useDebounceFn(async (q: string): Promise<void> => {
  const res: { results: addressResultType[] } = await $fetch(
    '/api/services/address',
    {
      query: {
        q,
        suburbs: props.suburbs,
        addresses: props.addresses,
        lgas: props.lgas
      }
    }
  )
  if (res.results && res.results.length > 0) {
    results.value = res.results
  } else if (q === '') {
    results.value = []
  }
}, 300)
</script>
