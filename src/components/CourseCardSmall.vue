<script setup lang="ts">
import type { Course } from '@/types/Course'

defineProps<{ course: Course }>()
</script>

<template>
  <div
    class="w-full px-7 h-16 flex items-center justify-between bg-on-black rounded-xl cursor-pointer transition-all active:opacity-60 active:scale-95"
  >
    <span class="font-semibold">{{ course.title }}</span>
    <span class="text-sm font-light">{{ course.numSentencesDone }}/{{ course.numSentences }}</span>
  </div>
</template>
