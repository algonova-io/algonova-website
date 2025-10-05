<template>
  <div>

    <main >
      <Transition
         >
        <Modal id="chat" v-if="chatActive" class="mt-14 overflow-y-hidden">
          <ChatScreen key="chat" :initialMessage="draftText" />
        </Modal>
      </Transition>

      <Transition
          mode="out-in"
          enter-active-class="animate-slide-in-down"
          leave-active-class="animate-slide-out-up"
      >
        <Modal id="contactUs" v-if="contactActive" class="mt-14 ">
          <ContactUs key="contactUs" />
        </Modal>
      </Transition>
      <Transition
      mode="out-in"
      enter-active-class="animate-slide-in-down"
      leave-active-class="animate-slide-out-up"
      >
        <div v-if="!isModalActive">
          <section id="home"  class="scroll-mt-24 pt-20">
            <HeroSection key="hero" />
          </section>
          <section id="about"  class="scroll-mt-24">
            <About />
          </section>
          <section id="projects"  class="scroll-mt-24">
            <Projects />
          </section>
        </div>
      </Transition>

    </main>

    <!-- FAB is fixed; render only when chat is NOT open -->
    <GetQuoteFAB
        v-if="!isModalActive && route.hash !== '#home'"
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
import Modal from "../modals/modal.vue";
import ContactUs from "../modals/contact-us/contactUs.vue";
import {useModalStore} from "../modals/composable/useModalStore";
import {useScrollHandler} from "../core/compasebles/scrollHandler";

const {chatActive, contactActive, isModalActive} = useModalStore()
const draftText = ref('')

const route = useRoute()
const router = useRouter()
const {lockSpy, scrollToHash, initObservers, destroyObservers} = useScrollHandler(router, route, isModalActive)


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


watch(isModalActive, async () => {
  // Recreate observers when the modal panel toggles (layout shift)
  destroyObservers()
  await nextTick()
  if (!isModalActive.value) {
    initObservers()
    if (route.hash) scrollToHash(route.hash)
  }
})

onBeforeUnmount(() => destroyObservers())
</script>