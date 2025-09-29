<template>
  <div>
<!--    <SiteNav :chat-active="chatActive" @close="chatActive = false" />-->

    <main>
      <HeroSection class="scroll-mt-24"  v-if="!chatActive" key="hero" @start-chat="startChatFromHero" />
      <ChatScreen class="scroll-mt-24" v-else key="chat" :initial-text="draftText" />
      <About class="scroll-mt-24" />
      <Projects class="scroll-mt-24"  />
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
import {onBeforeUnmount, onMounted, ref} from 'vue'
import HeroSection from './hero/HeroSection.vue'
import ChatScreen from './chat/ChatScreen.vue'
import About from "../about/About.vue";
import Projects from "../projects/Projects.vue";
import GetQuoteFAB from "../core/GetQuoteFAB.vue";
import {useRoute, useRouter} from "vue-router";
import {setFromSpy} from "../../router";
import {isSpyLocked} from "../core/utils";
import {useIntersectionObserver} from "vuetify/lib/composables/intersectionObserver";

const chatActive = defineModel<boolean>('chatActive', {default: false})
const emit = defineEmits<{
  (e: 'close'): void
}>()
const router = useRouter()
const route = useRoute()

const draftText = ref<string>('') // optional: carry the user’s first input
function updateHashSilently(hash: string) {
  if (window.location.hash !== hash) {
    history.replaceState(null, '', hash) // no scroll, no history entry
  }
}
function startChatFromHero(text: string) {
  draftText.value = text

  // Use the View Transitions API if available
  const doSwap = () => {
    chatActive.value = !chatActive.value
  }
  doSwap()
}
let observer: IntersectionObserver | null = null

function initSectionSpy() {




  const sections = Array.from(document.querySelectorAll<HTMLElement>(
      'section[id], [data-section-id]' // flexible: either <section id="..."> or any element with data-section-id
  ))

  observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible entry that is intersecting
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return
        const el = visible.target as HTMLElement
        const id = el.id || el.dataset.sectionId

        if (!id) return

        // Update hash without adding a new history entry
        // if (route.hash !== `#${id}`) {
        //   setFromSpy(true)
        //   router.replace({ hash: `#${id}` }).finally(() => setFromSpy(false))
        // }

      },
      {
        // Tweak for your header height; this triggers when section top clears the header
        root: null,
        rootMargin: '120px 0px -60% 0px', // top offset ≈ header height; bottom margin biases toward current view
        threshold: [0.5, 0.8, 1],       // consider it "active" when a chunk is visible
      }
  )

  sections.forEach(s => observer!.observe(s))
}
onMounted(() => initSectionSpy())
onBeforeUnmount(() => { observer?.disconnect(); observer = null })

</script>
