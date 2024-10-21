<script setup lang="ts">
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
interface ITestContextProps {
  name: any
}

const emit = defineEmits<{}>()

const props = withDefaults(defineProps<ITestContextProps>(), {})

const { emitRplEvent } = useRippleEvent('testing', emit)

const fire = () => {
  emitRplEvent(
    'testFire',
    {
      action: 'search'
    },
    { global: true }
  )

  nextTick()
}
</script>

<template>
  <div>
    <button class="rpl-button" @click="fire">
      Fire "testing/testFire" event
    </button>
  </div>
</template>

<style scoped></style>
