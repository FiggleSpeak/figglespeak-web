<script setup lang="ts">
defineProps<{ color: 'yellow' | 'red' | 'blue' }>()
const emit = defineEmits(['click-animation'])

let pointerDownTime = 0

function handlePointerDown(event: MouseEvent) {
  pointerDownTime = Date.now()

  // adapted from https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
  const button = event.currentTarget as HTMLButtonElement
  const ripple = document.createElement('div')
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  const { left: buttonX, top: buttonY } = button.getBoundingClientRect()

  ripple.style.width = ripple.style.height = `${diameter}px`
  ripple.style.left = `${event.clientX - (buttonX + radius)}px`
  ripple.style.top = `${event.clientY - (buttonY + radius)}px`
  ripple.classList.add('ripple')

  const oldRipple = button.getElementsByClassName('ripple')[0]
  if (oldRipple) {
    oldRipple.remove()
  }

  button.appendChild(ripple)
}

function handlePointerUp(event: MouseEvent, doCall: boolean) {
  // fade out ripple
  const button = event.currentTarget as HTMLButtonElement

  const elapsedTime = Date.now() - pointerDownTime
  if (elapsedTime >= 500) {
    finishClick(button, doCall)
  } else {
    setTimeout(() => finishClick(button, doCall), 500 - elapsedTime)
  }
}

function finishClick(button: HTMLButtonElement, doCall: boolean) {
  const oldRipple = button.getElementsByClassName('ripple')[0] as HTMLDivElement | undefined
  if (oldRipple) {
    oldRipple.style.opacity = '0'
  }
  if (doCall) {
    emit('click-animation')
  }
}
</script>

<template>
  <button
    :class="[
      'h-16 px-7 rounded-xl transition-colors duration-200',
      'text-black',
      {
        yellow: 'bg-app-yellow',
        red: 'bg-app-red',
        blue: 'bg-app-blue'
      }[color],
      'flex items-center justify-center text-base font-semibold',
      'relative overflow-hidden'
    ]"
    @pointerdown="handlePointerDown"
    @pointerup="(e) => handlePointerUp(e, true)"
    @pointerleave="(e) => handlePointerUp(e, false)"
  >
    <slot></slot>
  </button>
</template>

<style>
.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  transform: scale(0);
  animation: ripple-expand 600ms ease-out;
  animation-fill-mode: forwards;

  /* fade out ripple on pointer up */
  transition: opacity 200ms ease-in-out;
}

@keyframes ripple-expand {
  to {
    transform: scale(3);
  }
}
</style>
