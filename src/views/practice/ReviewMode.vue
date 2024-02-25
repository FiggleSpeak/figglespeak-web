<script setup lang="ts">
import MyButton from '@/components/MyButton.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import PronunciationTile from '@/components/PronunciationTile.vue'

defineProps<{ sentence: string; highlights: number[][] | null; pronunciationTips: string[][] }>()
defineEmits(['openWord', 'retry'])
</script>

<template>
  <div class="mx-8 h-px bg-white/20 mt-8"></div>
  <div v-if="highlights != null" class="flex-1 flex flex-col py-4 overflow-y-auto">
    <h3 class="text-xs text-white/40 ml-9 mb-3">Click to see a video of the pronunciation</h3>
    <div v-for="(word, i) in sentence.split(' ')" :key="i">
      <PronunciationTile
        v-if="highlights[i].includes(0)"
        :word="word"
        :highlights="highlights[i]"
        :tips="pronunciationTips[i]"
        @click="$emit('openWord', i)"
      />
    </div>
  </div>
  <div class="fixed bottom-9 right-9">
    <MyButton color="blue" @click="$emit('retry')">
      Retry <MaterialIcon name="undo" class="text-black ml-3 -mr-2" />
    </MyButton>
  </div>
</template>
