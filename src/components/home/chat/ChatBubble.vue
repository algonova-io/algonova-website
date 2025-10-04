<script setup lang="ts">
import { computed } from 'vue'
import {Role} from "../../../models/Chat";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";

const props = withDefaults(defineProps<{
  sender: Role
  text: string
}>(), {
  sender: 'model',
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
      : ' text-ink '
})
const rowJustify = computed(() => (isUser.value ? 'justify-end' : 'justify-start'))
const ariaRole = computed(() => (isUser.value ? 'article' : 'article'))
const md = new MarkdownIt({
  breaks: true,   // newlines → <br>
  linkify: true,  // URLs → <a>
  html: false     // do NOT allow raw HTML from the model
})

const rendered = computed(() => {
  const html = md.render(props.text ?? '')
  // Sanitize before injecting into DOM
  return DOMPurify.sanitize(html)
})

</script>

<template>
  <div class="w-full">
    <div :class="['flex', rowJustify]" >
      <div
          :role="ariaRole"
          class="rounded-2xl px-4 py-3 text-[15px] leading-relaxed "
          :class="bubbleClasses"
          v-html="rendered"
      >
      </div>
    </div>
  </div>
</template>