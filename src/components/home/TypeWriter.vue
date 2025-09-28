<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'

interface Props {
  /** Words/phrases to cycle through */
  words: string[]
  /** ms per typed character */
  typeSpeed?: number
  /** ms per deleted character */
  deleteSpeed?: number
  /** ms to wait after a word is fully typed */
  pauseAfterType?: number
  /** ms to wait after a word is fully deleted (before typing next) */
  pauseAfterDelete?: number
  /** start typing automatically */
  autoplay?: boolean
  /** loop through words */
  loop?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  typeSpeed: 80,
  deleteSpeed: 45,
  pauseAfterType: 1100,
  pauseAfterDelete: 400,
  autoplay: true,
  loop: true,
})

const displayText = ref('')
const wordIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
const isIdle = ref(false)

let timer: number | null = null

const currentWord = computed(() => props.words[wordIndex.value] ?? '')

function tick() {
  const full = currentWord.value

  if (!isDeleting.value) {
    // typing
    isIdle.value = false
    displayText.value = full.slice(0, charIndex.value + 1)
    charIndex.value++
    if (charIndex.value === full.length) {
      // done typing; pause then start deleting
      schedule(props.pauseAfterType, () => {
        isDeleting.value = true
        tick() // ← resume the loop
      })
      isIdle.value = true

      return
    }
    schedule(props.typeSpeed, tick)
  } else {
    // deleting
    isIdle.value = false

    displayText.value = full.slice(0, charIndex.value - 1)
    charIndex.value--
    if (charIndex.value === 0) {
      // advance to next word
      wordIndex.value++
      if (wordIndex.value >= props.words.length) {
        if (!props.loop) return
        wordIndex.value = 0
      }
      isDeleting.value = false
      schedule(props.pauseAfterDelete, tick)
      isIdle.value = true

      return
    }
    schedule(props.deleteSpeed, tick)
  }
}
function schedule(ms: number, fn: () => void) {
  clearTimer()
  timer = window.setTimeout(fn, ms)
}

function clearTimer() {
  if (timer !== null) {
    clearTimeout(timer)
    timer = null
  }
}

onMounted(() => { if (props.autoplay) tick() })
onBeforeUnmount(clearTimer)

// If words prop changes at runtime, restart cleanly
watch(() => props.words, () => {
  clearTimer()
  displayText.value = ''
  wordIndex.value = 0
  charIndex.value = 0
  isDeleting.value = false
  if (props.autoplay) tick()
})
</script>

<template>
  <!-- Use currentColor so parent text color controls the component -->
  <span class="inline-flex items-baseline">
    <span class="whitespace-pre">{{ displayText }}</span>
    <!-- Cursor -->
    <span
        aria-hidden="true"
        class="ml-1 inline-block w-[1px] -translate-y-[1px] text-accent"
        style="font-weight: normal"
        :class="{ 'animate-blink': isIdle }"
    >|</span>
  </span>
</template>

<style scoped>
@keyframes blink { 50% { opacity: 0; } }

.animate-blink {
  animation: blink 1s steps(1, end) infinite;
}
</style>