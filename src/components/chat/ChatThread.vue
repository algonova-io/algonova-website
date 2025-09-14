<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import ChatBubble from './ChatBubble.vue'
import {ChatMessage} from "../../models/Chat";

const props = defineProps<{
  messages: ChatMessage[]
}>()

const scrollerRef = ref<HTMLDivElement | null>(null)
async function scrollToBottom() {
  await nextTick()
  scrollerRef.value?.scrollTo({ top: scrollerRef.value.scrollHeight, behavior: 'smooth' })
}
onMounted(scrollToBottom)
watch(() => props.messages.length, scrollToBottom)
</script>

<template>
  <div ref="scrollerRef" class="relative w-full overflow-y-auto">
    <div class="space-y-4">
      <ChatBubble
          v-for="m in messages"
          :key="m.id"
          :sender="m.sender"
          :text="m.text"
      />
    </div>
  </div>
</template>