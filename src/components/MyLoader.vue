<script setup lang="ts">
defineProps<{ finished?: boolean }>()
</script>

<template>
  <div class="flex items-center gap-x-2 h-16 px-6 rounded-xl bg-[#444]">
    <div class="dot d1"></div>
    <div class="dot d2"></div>
    <div class="dot d3"></div>
  </div>
</template>

<style scoped>
.dot {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  animation: updown 600ms infinite;
  animation-direction: alternate;
  transform: translateY(6px);
}

.d2 {
  animation-delay: 150ms;
}

.d3 {
  animation-delay: 300ms;
}

@keyframes updown {
  0% {
    transform: translateY(6px);
  }
  100% {
    transform: translateY(-6px);
  }
}
</style>
