<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue'

defineProps<{ word: string; highlights: number[]; tips: string[] }>()
defineEmits(['close'])
</script>

<template>
  <div class="flex flex-col">
    <div
      class="w-12 h-12 m-9 rounded-full bg-on-black cursor-pointer grid place-items-center"
      @click="$emit('close')"
    >
      <MaterialIcon name="arrow_back" :size="20" />
    </div>
    <div class="flex items-center mx-9 mb-9">
      <div class="flex-1 flex flex-col items-start">
        <span class="text-sm mb-1.5">You said</span>
        <span class="text-2xl font-semibold">{{ word }}</span>
      </div>
      <div class="w-12 h-12 rounded-full bg-app-yellow grid place-items-center">
        <MaterialIcon name="volume_up" :size="20" class="text-black" />
      </div>
    </div>
    <span class="text-sm mb-4 ml-9">Correct pronunciation</span>
    <video controls class="mx-6 mb-4 rounded-2.5xl">
      <source
        :src="`https://figglespeak-api-b4xmvx4tla-uc.a.run.app/static/${word}.mp4`"
        type="video/mp4"
      />
    </video>
    <div
      v-for="(tip, i) in tips"
      :key="i"
      class="mx-6 mb-4 rounded-2.5xl bg-on-black p-5 pb-4 flex items-start"
    >
      <MaterialIcon name="info" class="text-app-blue mr-4" />
      <span class="text-sm">{{ tip }}</span>
    </div>
  </div>
</template>
