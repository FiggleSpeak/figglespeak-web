<script setup lang="ts">
import OralExamVideoTile from '@/components/OralExamVideoTile.vue'
</script>

<template>
  <div class="flex flex-col">
    <h1 class="mx-9 my-11">Oral Exam Coach</h1>
    <h3 class="text-white/60 text-sm font-semibold ml-9 mb-4">Select a video</h3>
    <OralExamVideoTile class="mx-6 mb-4" />
    <OralExamVideoTile class="mx-6 mb-4" />
    <OralExamVideoTile class="mx-6 mb-4" />
  </div>
</template>
