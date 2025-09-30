<script setup lang="ts">
import LogoMark from './LogoMark.vue'
import PrimaryButton from './PrimaryButton.vue'
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {RouteRecordName, useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {shouldObserverBeActive} from "./compasebles/useAutoScroll";

defineProps<{
  chatActive: boolean
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute();
const router = useRouter();

function toLabel(name: RouteRecordName | null | undefined) {
  if (!name) return 'Hero';
  const s = typeof name === 'string' ? name : String(name);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const links = [
  {label: 'Home', hash: '#home', href: {name: 'home', hash: '#home'}},
  {label: 'About', hash: '#about', href: {name: 'home', hash: '#about'}},
  {label: 'Projects', hash: '#projects', href: {name: 'home', hash: '#projects'}},
]

const currentHash = computed(() => route.hash || '#home')

function isLinkActive(hash: string) {
  // we’re a single-page layout under route 'home'
  if (route.name !== 'home') return false
  return currentHash.value === hash
}

function runFunction(fn: () => void) {
  console.log("Setting should observer be active to false")
  shouldObserverBeActive.value = false
  fn()
}
</script>

<template>
  <header class="sticky top-0 z-20">
    <nav class="mx-auto grid max-w-6xl   grid-cols-2 items-center px-6 py-5 rounded backdrop-blur">
      <div class="flex items-center">
        <LogoMark :size="200"/>
      </div>
      <!-- Right cell: nav links + CTA -->

      <div v-if="!chatActive" class="flex items-center justify-end gap-6">

        <div class="hidden md:flex items-center gap-2 " v-for="link in links" :key="link.hash">
          <RouterLink :to="link.href" custom v-slot="{ href, navigate }">
            <a
                :href="href"
                @click="runFunction(navigate)"
                :aria-current="isLinkActive(link.hash) ? 'page' : undefined"
                :class="[
                'px-3 py-2 text-m font-semibold transition-opacity',
                isLinkActive(link.hash) ? 'text-ink' : 'text-ink/60 hover:text-ink'
              ]"
            >
              {{ link.label }}
            </a>
          </RouterLink>
        </div>

        <PrimaryButton as="a" href="#">Get in touch</PrimaryButton>
      </div>
      <div v-else class="flex items-center justify-end">
        <button
            type="button"
            class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white
                   hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            aria-label="Close"
            @click="emit('close')"
        >
          <FontAwesomeIcon :icon="faXmark" class="h-4 w-4"/>
        </button>
      </div>
    </nav>
  </header>
</template>
