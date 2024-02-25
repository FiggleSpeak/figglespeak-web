<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'

defineProps<{ title: string; subtitle: string; isSelected: boolean }>()
</script>

<template>
  <div
    class="relative h-16 px-7 bg-black/10 rounded-xl border-2 cursor-pointer flex items-center justify-between"
    :class="isSelected ? 'border-black' : 'border-transparent'"
  >
    <b class="text-sm text-black">{{ title }}</b>
    <span class="text-black text-sm font-light">{{ subtitle }}</span>
    <MaterialIcon
      v-if="isSelected"
      name="check_circle"
      filled
      class="absolute top-0 right-0 text-black"
    />
  </div>
</template>
