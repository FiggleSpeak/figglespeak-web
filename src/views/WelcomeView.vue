<script setup lang="ts">
import MyButton from '@/components/MyButton.vue'
</script>

<template>
  <div class="w-full bg-[#222] flex flex-col md:h-screen md:flex-row">
    <div class="relative overflow-hidden">
      <img src="@/assets/images/speaker.png" class="w-full md:h-full md:object-cover" />
      <!-- no idea what is causing an extra pixel to show ... -->
      <svg viewBox="0 0 414 49" class="absolute w-full left-0 -bottom-[1px] md:hidden">
        <path d="M0 48.6798C113.756 -23.459 414 5.91979 414 5.91979V48.6798H0Z" fill="#222222" />
      </svg>
    </div>
    <div class="flex flex-col">
      <h1 class="mx-10 mb-5 mt-10 lg:mx-14">FiggleSpeak AI</h1>
      <p class="text-sm font-light mx-10 mb-10 lg:mx-14">
        The all in one, AI-powered speech therapy toolkit. Designed and developed by Team
        Figglebottom<sup>TM</sup>
      </p>
      <MyButton
        color="yellow"
        class="mx-6 mb-5 lg:mx-10"
        @click="$router.push('/course-selection')"
      >
        Get started
      </MyButton>
      <div class="flex items-center justify-center gap-x-6 mb-5">
        <a href="#" class="text-xs font-light opacity-40">About this app</a>
        <a href="#" class="text-xs font-light opacity-40">Privacy policy</a>
      </div>
    </div>
  </div>
</template>
