<template>
  <div>
    <SiteNav :chat-active="chatActive" @close="chatActive = false" />

    <main>
      <HeroSection v-if="!chatActive" key="hero" @start-chat="startChatFromHero" />
      <ChatScreen v-else key="chat" :initial-text="draftText" />

      <About id="about" />
      <Projects id="projects" />
    </main>

    <!-- FAB is fixed; render only when chat is NOT open -->
    <GetQuoteFAB
        v-if="!chatActive"
        class="z-50"
        @click=""
    />
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import HeroSection from './hero/HeroSection.vue'
import ChatScreen from './chat/ChatScreen.vue'
import About from "../about/About.vue";
import Projects from "../projects/Projects.vue";
import GetQuoteFAB from "../core/GetQuoteFAB.vue";

const chatActive = defineModel<boolean>('chatActive', {default: false})
const emit = defineEmits<{
  (e: 'close'): void
}>()

const draftText = ref<string>('') // optional: carry the user’s first input

function startChatFromHero(text: string) {
  draftText.value = text

  // Use the View Transitions API if available
  const doSwap = () => {
    chatActive.value = !chatActive.value
  }
  doSwap()
}
</script>
