<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView :path="$route.path" />
</template>
