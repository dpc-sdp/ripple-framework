<template>
  <div>
    <p>Sign-In Options:</p>
    <p>
      Status:
      <b>
        {{ status }}
      </b>
    </p>
    <!-- NOTE: Here we hard-coded username and password, on your own page this should probably be connected to two inputs for username + password -->
    <RplButton @click="signIn('tide')"> Sign in to Tide CMS </RplButton>
  </div>
</template>
<script setup lang="ts">
import { useSession } from '#imports'
definePageMeta({ auth: false })
const { signIn, status } = useSession()
</script>
