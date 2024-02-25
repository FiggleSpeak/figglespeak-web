<template>
  <i
    class="material-symbols-outlined select-none"
    :class="filled ? 'icon-filled' : ''"
    :style="`font-size: ${size ?? 24}px`"
  >
    {{ name }}
  </i>
</template>

<script setup lang="ts">
defineProps<{ name: string; size?: number; filled?: boolean }>()
</script>

<style scoped></style>
