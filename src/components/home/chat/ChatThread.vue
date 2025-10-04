<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import ChatBubble from './ChatBubble.vue'
import {ChatMessage} from "../../../models/Chat";

const props = defineProps<{
  messages: ChatMessage[],
  isModelTyping: boolean
}>()

watch(() => props.messages, () => {
  console.log("Srolling to bottom after new message arrives:")
  scrollToBottom()
})

const scrollerRef = ref<HTMLDivElement | null>(null)
async function scrollToBottom() {
  await nextTick()
  requestAnimationFrame(() => {              // wait for layout/paint
    const el = scrollerRef.value
    if (!el) return
    // direct assignment is more reliable than smooth + scrollHeight top in some engines
    el.scrollTop = el.scrollHeight
  })
}
onMounted(scrollToBottom)
watch(() => props.messages.length, scrollToBottom)
</script>

<template>
  <div ref="scrollerRef" class="relative w-full overflow-y-auto">
    <div class="space-y-4">
      <ChatBubble
          v-for="m in messages"
          :key="m.createdAt"
          :sender="m.role"
          :text="m.content"
      />
      <div
          v-if="isModelTyping"
          class="flex items-center px-2 py-2 "
      >
        <span class="typing-dot bg-accent"></span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.typing-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  animation: pulse-scale 900ms ease-in-out infinite;
  transform-origin: center;
}

@keyframes pulse-scale {
  0%, 100% {
    transform: scale(0.7);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .typing-dot {
    animation: none;
  }
}

</style>