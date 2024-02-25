<script setup lang="ts">
import { ref } from 'vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import MyButton from '@/components/MyButton.vue'
import MyLoader from '@/components/MyLoader.vue'
import SpeechCorrectionService from '@/services/SpeechCorrectionService'

const NUM_BARS = 15 // actively moving bars
const TOTAL_BARS = Math.ceil(window.screen.width / 12)
const INACTIVE_EACH_SIDE = Math.ceil((TOTAL_BARS - NUM_BARS) / 2)

const isRecording = ref(false)
const isLoading = ref(false)
const durationText = ref('0:00')
const micVolume = ref(0)
const { sentence } = defineProps<{ sentence: string }>()
const emit = defineEmits(['analyzing-speech', 'finish'])

let recordingStart = 0
let activeStream: MediaStream
let audioContext: AudioContext
let mediaRecorder: MediaRecorder
let audioBlobs: Blob[]
let intervalId: number

function sigmoid(x: number) {
  return 1 / (1 + Math.E ** -x)
}

function calcHeight(bar: number) {
  if (!isRecording.value) return 1
  const dist = Math.abs(bar - NUM_BARS / 2)
  const distSigmoid = (NUM_BARS / 5 - dist) / 1.4
  const a = micVolume.value * sigmoid(distSigmoid) + Math.random() * 10
  return a * (1 + Math.random() / 3)
}

function startRecording() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      activeStream = stream

      // Create audio context and analyzer node
      audioContext = new window.AudioContext()
      const analyzer = audioContext.createAnalyser()

      // Connect the microphone stream to the analyzer
      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(analyzer)

      // Set the desired parameters for the analyzer
      analyzer.fftSize = 256
      const bufferLength = analyzer.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      // Audio recorder
      mediaRecorder = new MediaRecorder(stream)
      audioBlobs = []

      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioBlobs.push(event.data)
      })
      mediaRecorder.start()

      function updateVolumeAndDuration() {
        analyzer.getByteFrequencyData(dataArray)
        const volume = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength
        micVolume.value = volume

        const secs = Math.round((Date.now() - recordingStart) / 1000)
        const mins = Math.floor(secs / 60)
        durationText.value = `${mins}:${(secs % 60).toString().padStart(2, '0')}`
      }

      isRecording.value = true
      recordingStart = Date.now()

      updateVolumeAndDuration()
      intervalId = setInterval(() => requestAnimationFrame(updateVolumeAndDuration), 100)
    })
    .catch((error) => {
      console.error('Error accessing microphone:', error)
    })
}

function finishRecording() {
  // submit to server, get feedback
  new Promise<Blob>((resolve) => {
    mediaRecorder.addEventListener('stop', () => {
      let audioBlob = new Blob(audioBlobs, { type: mediaRecorder.mimeType })
      resolve(audioBlob)
    })
    mediaRecorder.stop()
    activeStream.getTracks().forEach((track) => track.stop())
    audioContext.close()
    clearInterval(intervalId)
    isRecording.value = false
  }).then((audioBlob) => {
    isLoading.value = true
    SpeechCorrectionService.correctSpeech(audioBlob, sentence).then((data) => {
      isLoading.value = false
      emit('finish', data)
    })
  })
}
</script>

<template>
  <div class="flex-1"></div>
  <div class="w-full h-48 relative flex items-center justify-center gap-x-1.5">
    <div v-for="bar in INACTIVE_EACH_SIDE" :key="bar" class="w-1.5 h-px bg-[#a2a2a2]"></div>
    <div
      v-for="bar in NUM_BARS"
      :key="bar"
      class="w-1.5 bg-[#a2a2a2] rounded-md transition-height"
      :style="`height: ${calcHeight(bar)}px`"
    ></div>
    <div v-for="bar in INACTIVE_EACH_SIDE" :key="bar" class="w-1.5 h-px bg-[#a2a2a2]"></div>
    <div class="absolute -z-10 w-3/4 h-48 rounded-l-[56px] right-0 top-0 bg-[#2c2c2c]"></div>
  </div>
  <div class="flex-1"></div>
  <div class="flex items-center justify-between ml-12 mr-9 mb-9">
    <span class="text-sm font-bold">{{ durationText }}</span>
    <MyLoader v-if="isLoading" />
    <MyButton v-else-if="!isRecording" color="red" @click="startRecording">
      Begin <MaterialIcon name="mic" class="text-black ml-3 -mr-2" />
    </MyButton>
    <MyButton v-else color="red" @click="finishRecording">
      Finish <MaterialIcon name="skip_next" class="text-black ml-3 -mr-2" />
    </MyButton>
  </div>
</template>

<style>
.transition-height {
  transition: height 100ms linear;
}
</style>
