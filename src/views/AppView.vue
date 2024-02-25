<script setup lang="ts">
import AppTabBar from '@/components/AppTabBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen flex flex-col md:flex-row-reverse">
    <div class="flex-1 overflow-y-auto">
      <RouterView />
    </div>
    <AppTabBar />
  </div>
</template>
