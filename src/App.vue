
<script setup lang="ts">
import SiteNav from './components/SiteNav.vue'
import {ref} from "vue";
import { useScrollPageRouter} from "./composables/useScrollPageRouter";
import {routes} from "./router/router";

const isChat = ref(false)
const draftText = ref<string>('') // optional: carry the user’s first input

useScrollPageRouter(routes.map(r => r.name).filter(Boolean)
    , {
  thresholdPx: 12,
  debounceMs: 700,
  enableKeys: true,
});
function startChatFromHero(text: string) {
  draftText.value = text

  // Use the View Transitions API if available
  const doSwap = () => { isChat.value = true }
  if ((document as any).startViewTransition) {
    (document as any).startViewTransition(doSwap)
  } else {
    doSwap()
  }
}

</script>

<template>
  <div>
    <SiteNav
        :chat-active="isChat"
        @close="isChat = false"
    />
    <RouterView v-slot="{ Component }">
      <Transition
          mode="out-in"
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2">
        <component :is="Component"
                   v-model:chat-active="isChat"/>
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
</style>
