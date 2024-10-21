<script setup lang="ts">
import { useEventContext } from '@dpc-sdp/ripple-ui-core'

interface ITestContextProps {
  objKey: any
  on: any
  off: any
}

const props = withDefaults(defineProps<ITestContextProps>(), {})

const { context, updateContext } = useEventContext()
</script>

<template>
  <div>
    Change <b>{{ objKey }}</b>
    <button class="rpl-button" @click="updateContext(objKey, on)">
      {{ on }}
    </button>
    <button class="rpl-button" @click="updateContext(objKey, off)">
      {{ off }}
    </button>
  </div>
</template>

<style scoped></style>
