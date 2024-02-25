<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue'
</script>

<template>
  <div class="h-full px-9 flex flex-col items-center">
    <div class="w-48 h-48 rounded-full bg-app-blue grid place-items-center my-10">
      <MaterialIcon name="person" :size="72" class="text-black" />
    </div>
    <h1 class="mb-3">Guest</h1>
    <span class="text-sm text-center"></span>
  </div>
</template>
