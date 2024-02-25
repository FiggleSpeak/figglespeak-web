<script setup lang="ts">
import { ref } from 'vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import SpeakMode from './practice/SpeakMode.vue'
import ReviewMode from './practice/ReviewMode.vue'
import DbService from '@/services/DbService'
import { useRoute, useRouter } from 'vue-router'
import CompletionModal from '@/components/CompletionModal.vue'
import WordPronunciationView from './WordPronunciationView.vue'

const route = useRoute()
const router = useRouter()
const course = DbService.getMyCourse(parseInt(route.params.id as string))

const sentence = ref(DbService.getNextSentence(course.id, course.numSentencesDone))
const mode = ref('speak')
const highlights = ref<number[][] | null>(null)
const pronunciationTips = ref<string[][]>([])
const showCompleted = ref(course.numSentencesDone >= course.numSentences)
const helpOnWordI = ref<number | null>(null)
const score = ref(0)

function isGoodEnough(newHighlights: number[][]) {
  let numCorrect = 0
  let total = 0
  for (const word of newHighlights) {
    numCorrect += word.reduce((sum, num) => sum + num)
    total += word.length
  }
  score.value = Math.round((100 * numCorrect) / total)
  return score.value > 80
}

function finishSpeaking(data: [number[][], string[][]]) {
  const [newHighlights, newPronunciationTips] = data
  highlights.value = newHighlights
  pronunciationTips.value = newPronunciationTips
  if (isGoodEnough(newHighlights)) {
    showCompleted.value = true
  } else {
    mode.value = 'review'
  }
}

function openWord(i: number) {
  // show more information on the word
  helpOnWordI.value = i
}

function retry() {
  highlights.value = null
  helpOnWordI.value = null
  mode.value = 'speak'
}

function confirmCompletion() {
  showCompleted.value = false
  highlights.value = null
  helpOnWordI.value = null
  if (course.numSentencesDone >= course.numSentences) {
    router.back()
  }
  course.numSentencesDone++
  DbService.setMyProgress(course.id, course.numSentencesDone)
  if (course.numSentencesDone < course.numSentences) {
    sentence.value = DbService.getNextSentence(course.id, course.numSentencesDone)
  } else {
    router.back()
  }
}
</script>

<template>
  <Transition name="fade">
    <WordPronunciationView
      v-if="helpOnWordI != null"
      :word="sentence.split(' ')[helpOnWordI]"
      :highlights="highlights![helpOnWordI]"
      :tips="pronunciationTips[helpOnWordI]"
      @close="helpOnWordI = null"
      class="absolute w-screen min-h-screen bg-[#222] z-10 overflow-y-auto"
    />
  </Transition>
  <div class="h-screen flex flex-col">
    <Transition name="fade">
      <CompletionModal v-if="showCompleted" :score="score" @confirm="confirmCompletion" />
    </Transition>
    <div class="flex justify-between m-9">
      <div
        class="w-12 h-12 rounded-full bg-on-black cursor-pointer grid place-items-center"
        @click="$router.back"
      >
        <MaterialIcon name="arrow_back" :size="20" />
      </div>
      <div class="h-12 px-7 rounded-full bg-on-black text-sm grid place-items-center">
        {{ course.title }} ({{ course.numSentencesDone + 1 }}/{{ course.numSentences }})
      </div>
    </div>
    <h3 class="text-sm font-semibold ml-9 mt-2 mb-6">
      {{ mode === 'speak' ? 'Read the sentence below' : `Your score: ${score}%` }}
    </h3>
    <div class="flex flex-wrap gap-x-2 mx-9">
      <div v-for="(word, i) in sentence.split(' ')" :key="i">
        <span
          v-for="(letter, j) in word"
          :key="j"
          class="font-semibold"
          :class="[
            mode === 'speak' ? 'text-2xl' : 'text-lg',
            highlights == null ? '' : highlights[i][j] ? 'text-app-green' : 'text-app-red'
          ]"
        >
          {{ letter }}
        </span>
      </div>
    </div>
    <SpeakMode v-if="mode === 'speak'" :sentence="sentence" @finish="finishSpeaking" />
    <ReviewMode
      v-else-if="mode === 'review'"
      :sentence="sentence"
      :highlights="highlights"
      :pronunciationTips="pronunciationTips"
      @openWord="openWord"
      @retry="retry"
    />
  </div>
</template>
