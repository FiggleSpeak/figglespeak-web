<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'

const tabs = [
  { icon: 'book_2', path: 'practice', label: 'Practice' },
  { icon: 'video_chat', path: 'oral-exam-coach', label: 'Oral Exam' },
  { icon: 'account_circle', path: 'account', label: 'Account' }
]
</script>

<template>
  <div class="h-px mx-5 mb-4 bg-white/10 md:w-px md:mx-0 md:h-full"></div>
  <div class="flex items-center mb-4 md:flex-col md:items-start">
    <router-link
      v-for="(tab, i) in tabs"
      :key="i"
      :to="`/app/${tab.path}`"
      :class="[
        'flex-1 flex flex-col gap-y-1.5 items-center cursor-pointer',
        'md:flex-none md:w-56 md:h-16 md:px-6 md:gap-x-2 md:flex-row'
      ]"
    >
      <MaterialIcon
        :name="tab.icon"
        :class="$route.path === `/app/${tab.path}` ? 'text-app-yellow' : ''"
      />
      <span
        class="text-xs md:text-base md:font-semibold"
        :class="$route.path === `/app/${tab.path}` ? 'text-app-yellow' : ''"
      >
        {{ tab.label }}
      </span>
    </router-link>
  </div>
</template>
