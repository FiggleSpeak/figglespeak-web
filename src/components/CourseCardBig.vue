<script setup lang="ts">
import type { Course } from '@/types/Course'

const { course } = defineProps<{ course: Course }>()

const progress = Math.floor((100 * course.numSentencesDone) / course.numSentences)
</script>

<template>
  <div
    class="w-full px-7 py-5 flex flex-col bg-on-black rounded-2.5xl cursor-pointer transition-all active:opacity-60 active:scale-95"
  >
    <span class="text-xl font-semibold mb-6">{{ course.title }}</span>
    <div class="w-full h-1 rounded-sm bg-white/10 mb-2">
      <div class="h-1 rounded-sm bg-app-blue" :style="`width: ${progress}%`"></div>
    </div>
    <span class="text-sm font-light">
      {{ course.numSentencesDone }}/{{ course.numSentences }} sentences mastered
    </span>
  </div>
</template>
