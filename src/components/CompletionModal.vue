<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'
import MyButton from './MyButton.vue'

defineProps<{ score: number }>()
const emit = defineEmits(['confirm'])

function confirm() {
  emit('confirm')
}
</script>

<template>
  <div class="absolute w-screen h-screen bg-black/40 z-10 flex items-center justify-center">
    <div class="w-full mx-6 rounded-[40px] bg-on-black flex flex-col items-center md:w-96">
      <div class="flex items-end gap-x-1 -mb-2 -translate-y-1/2">
        <MaterialIcon
          name="kid_star"
          filled
          :size="64"
          class="text-app-yellow"
          :class="score > 90 ? '' : 'opacity-0'"
        />
        <MaterialIcon name="kid_star" filled :size="80" class="text-app-yellow mb-1" />
        <MaterialIcon
          name="kid_star"
          filled
          :size="64"
          class="text-app-yellow"
          :class="score === 100 ? '' : 'opacity-0'"
        />
      </div>
      <h2 class="text-xl font-semibold mb-3">Great job!</h2>
      <span class="text-center mb-4">
        You scored: {{ score }}% <br />
        You read the sentence well!
      </span>
      <MyButton color="blue" @click="confirm" class="translate-y-1/2">
        Continue <MaterialIcon name="arrow_forward" class="text-black ml-3 -mr-2" />
      </MyButton>
    </div>
  </div>
</template>
