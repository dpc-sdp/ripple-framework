<script setup lang="ts">
import { useEventContext } from '@dpc-sdp/ripple-ui-core'

interface ITestContextProps {
}

const props = withDefaults(defineProps<ITestContextProps>(), {})

const { context } = useEventContext()
</script>

<template>
  <div class="testing123">
    {{ context }}
  </div>
</template>

<style scoped>
.testing123 {
  padding: 20px;
  margin: 10px 0;
  border: 1px solid;
  background-color: rgba(0,0,0,0.05);
  font-size: 16px;
}
</style>
