<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'

defineProps<{ word: string; highlights: number[]; tips: string[] }>()
</script>

<template>
  <div class="flex items-start cursor-pointer py-3 transition-colors active:bg-white/5">
    <div class="w-6 h-px bg-white/40 mr-3 mt-3"></div>
    <div class="flex-1 flex flex-col">
      <div class="flex items-center mb-2">
        <span
          v-for="(letter, i) in word"
          :key="i"
          class="text-lg font-semibold"
          :class="highlights[i] ? 'text-app-green' : 'text-app-red'"
        >
          {{ letter }}
        </span>
        <MaterialIcon name="volume_up" :size="20" class="ml-2" />
      </div>
      <span v-if="tips.length > 0" class="text-sm font-light">{{ tips[0] }}</span>
      <span v-if="tips.length > 1" class="text-sm text-white/60 font-light mt-2">
        +{{ tips.length - 1 }} tips
      </span>
    </div>
  </div>
</template>
