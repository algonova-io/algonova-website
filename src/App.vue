
<script setup lang="ts">
import SiteNav from './components/core/SiteNav.vue'
import {useModalStore} from "./components/modals/composable/useModalStore";
const {chatActive} = useModalStore()
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

</script>

<template>
  <div :class="chatActive ? 'overflow-hidden' : ''">
    <SiteNav
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
        <component :is="Component"/>
      </Transition>
    </RouterView>
    <Toaster position="top-right" richColors />
  </div>
</template>

<style scoped>
</style>
