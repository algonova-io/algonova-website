<template>
  <div>

    <main >
      <Transition
         >
        <Modal id="chat" v-if="chatActive" class="mt-14 overflow-y-hidden">
          <ChatScreen key="chat" :initialMessage="draftText" />
        </Modal>
      </Transition>
      <div v-if="!chatActive">
        <section id="home"  class="scroll-mt-24 pt-20">
          <HeroSection key="hero" @start-chat="startChatFromHero" />
        </section>
        <section id="about"  class="scroll-mt-24">
          <About />
        </section>
        <section id="projects"  class="scroll-mt-24">
          <Projects />
        </section>
      </div>

    </main>

    <!-- FAB is fixed; render only when chat is NOT open -->
    <GetQuoteFAB
        v-if="!chatActive && route.hash !== '#home'"
        class="z-50"
        @click="scrollToHash('#home')"
    />
  </div>
</template>
<script setup lang="ts">import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeroSection from './hero/HeroSection.vue'
import ChatScreen from './chat/ChatScreen.vue'
import About from '../about/About.vue'
import Projects from '../projects/Projects.vue'
import GetQuoteFAB from '../core/GetQuoteFAB.vue'


import { useIntersectionObserver } from '@vueuse/core'
import {fromSpy, shouldObserverBeActive} from "../core/compasebles/useAutoScroll";
import Modal from "../modals/modal.vue";

const chatActive = defineModel<boolean>('chatActive', { default: false })
const draftText = ref('')

const route = useRoute()
const router = useRouter()

const HEADER_OFFSET = 88

// tiny lock to avoid spy<->watch loops
let lock = 0
const lockSpy = (d = 1) => { lock = Math.max(0, lock + d) }
const isLocked = () => lock > 0

async function startChatFromHero(text: string) {
  if (chatActive.value) return
  console.log("startChatFromHero", text)
  // draftText.value = text
  // chatActive.value = !chatActive.value

  // if ('startViewTransition' in document) {
  //   // The DOM mutation must happen inside the callback.
  //   // Returning nextTick() lets Vue flush the new state before the transition snapshots.
  //   // @ts-ignore types for experimental API
  //   await (document as any).startViewTransition(() => {
  //     draftText.value = text
  //     chatActive.value = !chatActive.value
  //     return nextTick()
  //   }).finished
  // } else {
  //   // Fallback if VTA isn’t supported
  // }
  draftText.value = text
  chatActive.value = !chatActive.value

}

function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top: y, behavior: 'smooth' })
}

/** ------- Observers (Vuetify) ------- */
type StopFn = () => void
const stops: StopFn[] = []


function observeSection(selector: '#home'|'#about'|'#projects') {
  const el = document.querySelector(selector)
  if (!el) return


  // Vuetify returns { stop }
  const { stop } = useIntersectionObserver(
      el as any,
      (entries: any) => {
        if (!shouldObserverBeActive.value) {

          setTimeout(() => {
            shouldObserverBeActive.value = true
          })

          return
        }
        fromSpy.value = true
        const e = entries[0]
        if (!e?.isIntersecting) return
        const targetHash = selector

        if (isLocked()) return
        if ((route.hash || '') === targetHash) return

        // Update only the hash, tell scrollBehavior to skip
        lockSpy(+1)
        router.replace({ hash: targetHash,})
            .finally(() => {
              lockSpy(-1)
            })
      },
      {
        threshold: [0, 0.15, 0.3],
        root: null,
        rootMargin: '-45% 0px -45% 0px',
      }
  )

  stops.push(stop)
}

function initObservers() {
  // if chat is open, layout height changes a lot—pause spying
  if (chatActive.value) return
  observeSection('#home')
  observeSection('#about')
  observeSection('#projects')
}

function destroyObservers() {
  while (stops.length) {
    try { (stops.pop() as StopFn)() } catch {}
  }
}

/** ------- Lifecycle & watchers ------- */
onMounted(async () => {
  await nextTick()

  // Initial alignment
  if (!route.hash) {
    lockSpy(+1)
    router.replace({ hash: '#home', state: { fromSpy: true } })
        .finally(() => lockSpy(-1))
  } else {
    scrollToHash(route.hash)
  }

  initObservers()
})

// watch(() => route.hash, (hash) => {
//   if (!hash) return
//   if (!isLocked())
//     if (from)
//     scrollToHash(hash)
// })

watch(chatActive, async () => {
  // Recreate observers when the chat panel toggles (layout shift)
  destroyObservers()
  await nextTick()
  if (!chatActive.value) {
    initObservers()
    if (route.hash) scrollToHash(route.hash)
  }
})

onBeforeUnmount(() => destroyObservers())
</script>