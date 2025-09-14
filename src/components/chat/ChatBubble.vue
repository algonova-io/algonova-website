<script setup lang="ts">
import { computed } from 'vue'
import {Sender} from "../../models/Chat";

const props = withDefaults(defineProps<{
  sender: Sender
  text: string
}>(), {
  sender: 'assistant',
  text: ''
})

/**
 * Design language:
 * - user: accent background, white text, right aligned
 * - assistant/system: white bg, subtle border, left aligned
 */
const isUser = computed(() => props.sender === 'user')
const bubbleClasses = computed(() => {
  return isUser.value
      ? 'bg-accent text-white shadow-sm'
      : ' text-ink font-semibold'
})
const rowJustify = computed(() => (isUser.value ? 'justify-end' : 'justify-start'))
const ariaRole = computed(() => (isUser.value ? 'article' : 'article'))
</script>

<template>
  <div class="w-full">
    <div :class="['flex', rowJustify]">
      <p
          :role="ariaRole"
          class="max-w-[70ch] rounded-2xl px-4 py-3 text-[15px] leading-relaxed "
          :class="bubbleClasses"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>