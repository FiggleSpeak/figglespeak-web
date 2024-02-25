<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'
</script>

<template>
  <div class="bg-on-black rounded-2.5xl overflow-clip">
    <div class="w-full h-40 bg-app-blue"></div>
    <div class="flex items-center px-5 py-4">
      <div class="flex-1 flex flex-col items-start">
        <span class="text-xs mb-2">3m 20s</span>
        <span class="text-lg font-semibold">In the classroom</span>
      </div>
      <MaterialIcon name="play_circle" :size="28" class="text-app-blue" />
    </div>
  </div>
</template>
